import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EType } from 'src/shared/enums/EType';

// Tells TypeORM this class maps to a database table called "categories"
@Entity('categories')
export class Category {
  // Auto-generated unique ID for each category
  @PrimaryGeneratedColumn()
  id: number;

  // The category name — e.g. "Salary", "Rent". Must be unique.
  @Column({ unique: true })
  name: string;

  // Whether this category is for income or outcome entries
  // We restrict the value to only these two strings
  @Column({
    type: 'enum',
    enum: EType,
  })
  type: EType;

  // Optional description — nullable means the column accepts null in the DB
  @Column({ nullable: true })
  description: string;

  // Automatically set to the current timestamp when the record is created
  @CreateDateColumn()
  createdAt: Date;

  // Automatically updated to the current timestamp whenever the record changes
  @UpdateDateColumn()
  updatedAt: Date;
}
