import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recurrent } from './recurrent.entity';
import { Entry } from '../entries/entry.entity';
import { EType } from '../shared/enums/EType';
import { EMethod } from '../shared/enums/EMethod';
import {
  ICreateRecurrentDto,
  IUpdateRecurrentDto,
} from '../shared/interfaces/IRecurrentDTO';

@Injectable()
export class RecurrentsService {
  constructor(
    @InjectRepository(Recurrent)
    private readonly recurrentRepository: Repository<Recurrent>,
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {}

  async findAll(): Promise<Recurrent[]> {
    return this.recurrentRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string): Promise<Recurrent> {
    const recurrent = await this.recurrentRepository.findOne({ where: { id } });
    if (!recurrent) {
      throw new NotFoundException(`Recurrent with id ${id} not found`);
    }
    return recurrent;
  }

  // Creates the recurrent rule and generates the first entry
  async create(dto: ICreateRecurrentDto): Promise<Recurrent> {
    const recurrent = this.recurrentRepository.create({
      name: dto.name,
      day: Math.min(dto.day, 28),
    });
    await this.recurrentRepository.save(recurrent);

    // Determine date for first entry: this month's day if not yet passed, else next month
    const firstDate = this.resolveNextDate(recurrent.day, null);

    await this.entryRepository.save(
      this.entryRepository.create({
        description: dto.description,
        amount: dto.amount,
        type: EType.Income,
        method: EMethod.Debit,
        date: firstDate,
        notes: dto.notes,
        category: dto.categoryId ? { id: dto.categoryId } : undefined,
        recurrentId: recurrent.id,
      }),
    );

    return recurrent;
  }

  async update(id: string, dto: IUpdateRecurrentDto): Promise<Recurrent> {
    const recurrent = await this.findOne(id);
    if (dto.name !== undefined) recurrent.name = dto.name;
    if (dto.day !== undefined) recurrent.day = Math.min(dto.day, 28);
    return this.recurrentRepository.save(recurrent);
  }

  // Deletes the recurrent rule and all its future (unpassed) entries
  async remove(id: string): Promise<void> {
    const recurrent = await this.findOne(id);

    const today = new Date().toISOString().split('T')[0];

    // Delete only future entries — keep historical ones for record
    const futureEntries = await this.entryRepository
      .createQueryBuilder('entry')
      .where('entry.recurrentId = :id', { id })
      .andWhere('entry.date > :today', { today })
      .getMany();

    if (futureEntries.length > 0) {
      await this.entryRepository.remove(futureEntries);
    }

    await this.recurrentRepository.remove(recurrent);
  }

  // Core mechanic: for each recurrent, ensure exactly one future entry exists.
  // If the latest linked entry is in the past, create the next occurrence by cloning it.
  async advance(): Promise<{ advanced: number }> {
    const recurrents = await this.recurrentRepository.find();
    let advanced = 0;

    for (const recurrent of recurrents) {
      // Find the most recent entry for this recurrent
      const latestEntry = await this.entryRepository.findOne({
        where: { recurrentId: recurrent.id },
        order: { date: 'DESC' },
        relations: { category: true },
      });

      if (!latestEntry) continue;

      const today = new Date().toISOString().split('T')[0];
      const latestDate =
        typeof latestEntry.date === 'string'
          ? latestEntry.date
          : latestEntry.date.toISOString().split('T')[0];

      // Only advance if the latest entry's date has passed
      if (latestDate > today) continue;

      const nextDate = this.resolveNextDate(recurrent.day, latestDate);

      // Check no future entry already exists (idempotent)
      const existing = await this.entryRepository.findOne({
        where: { recurrentId: recurrent.id, date: nextDate as unknown as Date },
      });

      if (existing) continue;

      // Clone the latest entry with the new date
      await this.entryRepository.save(
        this.entryRepository.create({
          description: latestEntry.description,
          amount: latestEntry.amount,
          type: EType.Income,
          method: EMethod.Debit,
          date: nextDate,
          notes: latestEntry.notes,
          category: latestEntry.category ?? undefined,
          recurrentId: recurrent.id,
        }),
      );

      advanced++;
    }

    return { advanced };
  }

  // Given a day-of-month and an optional reference date,
  // returns the next occurrence date as a YYYY-MM-DD string.
  // If no reference: uses today — picks this month if day hasn't passed, else next month.
  // If reference given: always moves to the month after the reference.
  private resolveNextDate(day: number, referenceDate: string | null): string {
    const safeDay = Math.min(day, 28);

    if (referenceDate) {
      const ref = new Date(referenceDate);
      const next = new Date(ref.getFullYear(), ref.getMonth() + 1, safeDay);
      return next.toISOString().split('T')[0];
    }

    const today = new Date();
    const thisMonthOccurrence = new Date(
      today.getFullYear(),
      today.getMonth(),
      safeDay,
    );

    // If this month's day hasn't passed yet, use it; otherwise next month
    if (thisMonthOccurrence >= today) {
      return thisMonthOccurrence.toISOString().split('T')[0];
    }

    const nextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      safeDay,
    );
    return nextMonth.toISOString().split('T')[0];
  }
}
