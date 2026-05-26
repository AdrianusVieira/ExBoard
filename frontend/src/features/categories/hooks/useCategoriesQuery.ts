import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../services/categories.service";
import type { ICategoryPayload } from "../../../shared/interfaces/ICategoryPayload";

export const useCategoriesQuery = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const create = useMutation({
    mutationFn: (payload: ICategoryPayload) => createCategory(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ICategoryPayload }) =>
      updateCategory(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return { query, create, update, remove };
};
