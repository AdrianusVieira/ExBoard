import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entry.entity';
import { EType } from '../shared/enums/EType';
import { EMethod } from '../shared/enums/EMethod';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import {
  ICreateEntryDto,
  IUpdateEntryDto,
  ICreateCreditEntryDto,
} from 'src/shared/interfaces/IEntryDTO';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {}

  // Returns all entries
  async findAll(): Promise<Entry[]> {
    return this.entryRepository.find({
      order: { date: 'DESC' },
      relations: { category: true },
    });
  }

  // Returns a single entry by ID
  async findOne(id: number): Promise<Entry> {
    const entry = await this.entryRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!entry) {
      throw new NotFoundException(`Entry with id ${id} not found`);
    }
    return entry;
  }

  // Creates a single debit entry
  async create(dto: ICreateEntryDto): Promise<Entry> {
    const entry = this.entryRepository.create({
      ...dto,
      category: dto.categoryId ? { id: dto.categoryId } : undefined,
    });
    return this.entryRepository.save(entry);
  }

  // Creates a credit purchase and auto-generates one entry per installment
  async createCredit(dto: ICreateCreditEntryDto): Promise<Entry[]> {
    // Unique ID that groups all installments of this purchase together
    const creditGroupId: string = randomUUID();
    const installmentAmount = Number(
      (dto.amount / dto.installmentTotal).toFixed(2),
    );
    const entries: Entry[] = [];

    for (let i = 0; i < dto.installmentTotal; i++) {
      // Calculate the due date for each installment by adding months
      const dueDate = new Date(dto.firstDueDate);
      dueDate.setMonth(dueDate.getMonth() + i);

      const entry = this.entryRepository.create({
        description: dto.description,
        amount: installmentAmount,
        type: EType.Outcome,
        method: EMethod.Credit,
        date: dueDate.toISOString().split('T')[0],
        notes: dto.notes,
        category: dto.categoryId ? { id: dto.categoryId } : undefined,
        installmentNumber: i + 1,
        installmentTotal: dto.installmentTotal,
        creditGroupId,
      });

      entries.push(entry);
    }

    return this.entryRepository.save(entries);
  }

  // Updates an existing entry by ID
  async update(id: number, dto: IUpdateEntryDto): Promise<Entry> {
    const entry = await this.findOne(id);
    Object.assign(entry, {
      ...dto,
      category: dto.categoryId ? { id: dto.categoryId } : entry.category,
    });
    return this.entryRepository.save(entry);
  }

  // Deletes a single entry by ID
  async remove(id: number): Promise<void> {
    const entry = await this.findOne(id);
    await this.entryRepository.remove(entry);
  }

  // Deletes all installments of a credit purchase by creditGroupId
  async removeCreditGroup(creditGroupId: string): Promise<void> {
    const entries = await this.entryRepository.find({
      where: { creditGroupId },
    });
    await this.entryRepository.remove(entries);
  }
}
