import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import { EType } from '../shared/enums/EType';
import { EMethod } from 'src/shared/enums/EMethod';

@Entity('entries')
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: EType })
  type: EType;

  @Column({ type: 'enum', enum: EMethod, default: EMethod.Debit })
  method: EMethod;

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => Category, { nullable: true, eager: true })
  @JoinColumn()
  category: Category;

  @Column({ nullable: true })
  installmentNumber: number;

  @Column({ nullable: true })
  installmentTotal: number;

  @Column({ nullable: true })
  creditGroupId: string;

  // Links this entry to a recurrent rule — null for one-time entries
  @Column({ nullable: true })
  recurrentId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
