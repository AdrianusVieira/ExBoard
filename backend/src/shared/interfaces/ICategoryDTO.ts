import { EType } from '../enums/EType';

// The data we expect when creating a category
export interface ICreateCategoryDto {
  name: string;
  type: EType;
  description?: string;
}

// The data we expect when updating a category (all fields optional)
export interface IUpdateCategoryDto {
  name?: string;
  type?: EType;
  description?: string;
}
