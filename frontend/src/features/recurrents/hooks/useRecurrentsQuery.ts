import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRecurrents,
  createRecurrent,
  updateRecurrent,
  deleteRecurrent,
  advanceRecurrents,
} from "../../../services/recurrents.service";
import type {
  ICreateRecurrentPayload,
  IRecurrent,
} from "../../../shared/interfaces/IRecurrent";

export const useRecurrentsQuery = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["recurrents"],
    queryFn: getRecurrents,
  });

  const create = useMutation({
    mutationFn: (payload: ICreateRecurrentPayload) => createRecurrent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurrents"] });
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  const update = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Pick<IRecurrent, "name" | "day">>;
    }) => updateRecurrent(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recurrents"] }),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteRecurrent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurrents"] });
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  const advance = useMutation({
    mutationFn: advanceRecurrents,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["entries"] }),
  });

  return { query, create, update, remove, advance };
};
