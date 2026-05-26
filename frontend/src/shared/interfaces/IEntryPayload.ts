import type IEntry from "./IEntry";

export interface IEntryPayload {
  description: string;
  amount: number;
  type: IEntry["type"];
  method: IEntry["method"];
  date: string;
  notes?: string;
  categoryId?: number;
}
