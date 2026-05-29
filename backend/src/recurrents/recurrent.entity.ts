import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('recurrents')
export class Recurrent {
  // UUID — keeps it consistent with creditGroupId pattern
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Human-readable label for the source of recurrence — e.g. "Salary", "Freelance retainer"
  @Column()
  name: string;

  // Day of month this income recurs on — capped at 28 to avoid month-length issues
  @Column()
  day: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
