import { EType } from '../enums/EType';
import { EMethod } from '../enums/EMethod';

// The data we expect when creating a debit entry
export interface ICreateEntryDto {
  description: string;
  amount: number;
  type: EType;
  method: EMethod;
  date: string;
  notes?: string;
  categoryId?: number;
}

// The data we expect when creating a credit entry
// Extends CreateEntryDto with installment specific fields
export interface ICreateCreditEntryDto extends ICreateEntryDto {
  installmentTotal: number;
  firstDueDate: string;
}

// The data we expect when updating an entry
export interface IUpdateEntryDto {
  description?: string;
  amount?: number;
  type?: EType;
  method?: EMethod;
  date?: string;
  notes?: string;
  categoryId?: number;
}
