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
  // Auto-generated unique ID for each entry
  @PrimaryGeneratedColumn()
  id: number;

  // Short description of the entry — e.g. "May salary", "Apartment rent"
  @Column()
  description: string;

  // The amount of money — decimal with 2 precision for cents
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  // Whether this is an income or outcome entry
  @Column({ type: 'enum', enum: EType })
  type: EType;

  // Payment method — debit for immediate payments, credit for installments
  // Income entries always use debit as default
  @Column({ type: 'enum', enum: EMethod, default: EMethod.Debit })
  method: EMethod;

  // The date this entry refers to
  // For debit entries: the expense date
  // For credit installments: the installment due date
  @Column({ type: 'date' })
  date: Date;

  // Optional extra notes
  @Column({ nullable: true })
  notes: string;

  // Relationship to Category — many entries can belong to one category
  @ManyToOne(() => Category, { nullable: true, eager: true })
  @JoinColumn()
  category: Category;

  // For credit installments — which installment number is this (e.g. 3)
  @Column({ nullable: true })
  installmentNumber: number;

  // For credit installments — total number of installments (e.g. 12)
  @Column({ nullable: true })
  installmentTotal: number;

  // Groups all installments from the same credit purchase together
  // e.g. all 12 installments of "iPhone 15" share the same groupId
  @Column({ nullable: true })
  creditGroupId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
