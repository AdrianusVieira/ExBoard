import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEntries,
  createEntry,
  createCreditEntry,
  updateEntry,
  deleteEntry,
  deleteCreditGroup,
  type ICreditEntryPayload,
} from "../../../services/entries.service";
import { advanceRecurrents } from "../../../services/recurrents.service";
import type { IEntryPayload } from "../../../shared/interfaces/IEntryPayload";

export const useEntriesQuery = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["entries"],
    queryFn: async () => {
      // Advance recurrents before fetching so entries are always up to date.
      // Idempotent on the backend — safe to call on every load.
      await advanceRecurrents();
      return getEntries();
    },
  });

  const create = useMutation({
    mutationFn: (payload: IEntryPayload) => createEntry(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["entries"] }),
  });

  const createCredit = useMutation({
    mutationFn: (payload: ICreditEntryPayload) => createCreditEntry(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["entries"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: IEntryPayload }) =>
      updateEntry(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["entries"] }),
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteEntry(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["entries"] }),
  });

  const removeCredit = useMutation({
    mutationFn: (creditGroupId: string) => deleteCreditGroup(creditGroupId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["entries"] }),
  });

  return { query, create, createCredit, update, remove, removeCredit };
};
