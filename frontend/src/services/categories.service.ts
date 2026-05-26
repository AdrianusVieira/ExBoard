import http from "./http";
import type ICategory from "../shared/interfaces/ICategory";
import type { ICategoryPayload } from "../shared/interfaces/ICategoryPayload";

const getCategories = async (): Promise<ICategory[]> => {
  const { data } = await http.get("/categories");
  return data;
};

const createCategory = async (
  payload: ICategoryPayload,
): Promise<ICategory> => {
  const { data } = await http.post("/categories", payload);
  return data;
};

const updateCategory = async (
  id: number,
  payload: ICategoryPayload,
): Promise<ICategory> => {
  const { data } = await http.put(`/categories/${id}`, payload);
  return data;
};

const deleteCategory = async (id: number): Promise<void> => {
  await http.delete(`/categories/${id}`);
};

export { getCategories, createCategory, updateCategory, deleteCategory };
