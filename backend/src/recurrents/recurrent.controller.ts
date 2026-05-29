import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Recurrent } from './recurrent.entity';
import { RecurrentsService } from './recurrent.service';
import type {
  ICreateRecurrentDto,
  IUpdateRecurrentDto,
} from 'src/shared/interfaces/IRecurrentDTO';

@Controller('recurrents')
export class RecurrentsController {
  constructor(private readonly recurrentsService: RecurrentsService) {}

  // GET /recurrents
  @Get()
  findAll(): Promise<Recurrent[]> {
    return this.recurrentsService.findAll();
  }

  // GET /recurrents/:id
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Recurrent> {
    return this.recurrentsService.findOne(id);
  }

  // POST /recurrents
  // Creates the recurrent rule and generates the first entry
  @Post()
  create(@Body() dto: ICreateRecurrentDto): Promise<Recurrent> {
    return this.recurrentsService.create(dto);
  }

  // POST /recurrents/advance
  // Scans all recurrents and generates the next entry for any whose latest entry has passed.
  // Idempotent — safe to call multiple times.
  @Post('advance')
  advance(): Promise<{ advanced: number }> {
    return this.recurrentsService.advance();
  }

  // PUT /recurrents/:id
  // Updates only the rule (name, day) — does not touch existing entries
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: IUpdateRecurrentDto,
  ): Promise<Recurrent> {
    return this.recurrentsService.update(id, dto);
  }

  // DELETE /recurrents/:id
  // Removes the rule and deletes future (unmatured) entries, keeps history
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.recurrentsService.remove(id);
  }
}
