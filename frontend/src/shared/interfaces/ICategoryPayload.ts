import type ICategory from "./ICategory";

export interface ICategoryPayload {
  name: string;
  type: ICategory["type"];
  description?: string;
}
