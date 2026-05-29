import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recurrent } from './recurrent.entity';
import { Entry } from '../entries/entry.entity';
import { RecurrentsController } from './recurrent.controller';
import { RecurrentsService } from './recurrent.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recurrent, Entry])],
  controllers: [RecurrentsController],
  providers: [RecurrentsService],
  exports: [RecurrentsService],
})
export class RecurrentsModule {}
