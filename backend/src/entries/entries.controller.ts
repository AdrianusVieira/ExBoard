import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import type {
  ICreateEntryDto,
  IUpdateEntryDto,
  ICreateCreditEntryDto,
} from 'src/shared/interfaces/IEntryDTO';
import { Entry } from './entry.entity';

// All routes in this controller are prefixed with /entries
@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  // GET /entries
  // Returns all entries
  @Get()
  findAll(): Promise<Entry[]> {
    return this.entriesService.findAll();
  }

  // GET /entries/:id
  // Returns a single entry by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Entry> {
    return this.entriesService.findOne(id);
  }

  // POST /entries
  // Creates a single debit entry
  @Post()
  create(@Body() dto: ICreateEntryDto): Promise<Entry> {
    return this.entriesService.create(dto);
  }

  // POST /entries/credit
  // Creates a credit purchase and auto-generates one entry per installment
  @Post('credit')
  createCredit(@Body() dto: ICreateCreditEntryDto): Promise<Entry[]> {
    return this.entriesService.createCredit(dto);
  }

  // PUT /entries/:id
  // Updates an existing entry by ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: IUpdateEntryDto,
  ): Promise<Entry> {
    return this.entriesService.update(id, dto);
  }

  // DELETE /entries/:id
  // Deletes a single entry by ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.entriesService.remove(id);
  }

  // DELETE /entries/credit/:creditGroupId
  // Deletes all installments of a credit purchase
  @Delete('credit/:creditGroupId')
  removeCreditGroup(
    @Param('creditGroupId') creditGroupId: string,
  ): Promise<void> {
    return this.entriesService.removeCreditGroup(creditGroupId);
  }
}
