import type { TType } from "../types/TType";

export default interface ICategory {
  id: number;
  name: string;
  type: TType;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
