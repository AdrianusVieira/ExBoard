import { useState } from "react";
import { useCategoriesQuery } from "./useCategoriesQuery";
import type ICategory from "../../../shared/interfaces/ICategory";
import { EType } from "../../../shared/types/TType";

const useCategoriesPage = () => {
  const { query, create, update, remove } = useCategoriesQuery();

  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState<ICategory | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState<ICategory["type"]>(EType.Income);

  const handleCancel = () => {
    setEditing(null);
    setName("");
    setDescription("");
    setType(EType.Income);
  };

  const handleChangeDescription = (value: string) => {
    setDescription(value);
  };

  const handleChangeName = (value: string) => {
    setName(value);
  };

  const handleChangeType = (value: ICategory["type"]) => {
    setType(value);
  };

  const handleEdit = (category: ICategory) => {
    setEditing(category);
    setName(category.name);
    setDescription(category.description ?? "");
    setType(category.type);
  };

  const handleRemove = async (id: number) => {
    await remove.mutateAsync(id);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;

    if (editing) {
      await update.mutateAsync({
        id: editing.id,
        payload: { name, type, description },
      });
      setEditing(null);
    } else {
      await create.mutateAsync({ name, type, description });
    }

    setName("");
    setDescription("");
    setType(EType.Income);
  };

  return {
    description,
    editing,
    error: query.error,
    categories: query.data ?? [],
    loading: query.isLoading,
    name,
    type,
    handleCancel,
    handleChangeDescription,
    handleChangeName,
    handleChangeType,
    handleEdit,
    handleRemove,
    handleSubmit,
  };
};

export default useCategoriesPage;
