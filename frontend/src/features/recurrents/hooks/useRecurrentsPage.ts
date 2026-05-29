import { useState } from "react";
import { useRecurrentsQuery } from "./useRecurrentsQuery";
import { useCategoriesQuery } from "../../categories/hooks/useCategoriesQuery";
import type { ICreateRecurrentPayload } from "../../../shared/interfaces/IRecurrent";

const useRecurrentsPage = () => {
  const { query, create, remove } = useRecurrentsQuery();
  const { query: categoriesQuery } = useCategoriesQuery();

  const [showForm, setShowForm] = useState(false);

  const handleNewRecurrent = () => setShowForm(true);

  const handleCloseForm = () => setShowForm(false);

  const handleSubmit = async (payload: ICreateRecurrentPayload) => {
    await create.mutateAsync(payload);
    setShowForm(false);
  };

  const handleRemove = async (id: string) => {
    await remove.mutateAsync(id);
  };

  return {
    recurrents: query.data ?? [],
    categories: categoriesQuery.data ?? [],
    loading: query.isLoading,
    error: query.error,
    showForm,
    handleNewRecurrent,
    handleCloseForm,
    handleSubmit,
    handleRemove,
  };
};

export default useRecurrentsPage;
