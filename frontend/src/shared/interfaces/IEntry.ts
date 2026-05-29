import type ICategory from "./ICategory";
import type { TType } from "../types/TType";
import type { TMethod } from "../types/TMethod";

export default interface IEntry {
  id: number;
  description: string;
  amount: number;
  type: TType;
  method: TMethod;
  date: string;
  notes?: string;
  category?: ICategory;
  installmentNumber?: number;
  installmentTotal?: number;
  creditGroupId?: string;
  recurrentId?: string;
  createdAt: string;
  updatedAt: string;
}
