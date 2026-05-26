import { useState, useMemo } from "react";
import { useEntriesQuery } from "./useEntriesQuery";
import type IEntry from "../../../shared/interfaces/IEntry";
import { EType } from "../../../shared/types/TType";
import { getDefaultDates } from "../utils/filters";
import type { ICreditEntryPayload } from "../../../services/entries.service";
import type { IEntryPayload } from "../../../shared/interfaces/IEntryPayload";

const useEntriesPage = () => {
  const { query, create, createCredit, update, remove, removeCredit } =
    useEntriesQuery();

  const { from: defaultFrom, to: defaultTo } = getDefaultDates();

  const [dateFrom, setDateFrom] = useState(defaultFrom);
  const [dateTo, setDateTo] = useState(defaultTo);
  const [filterType, setFilterType] = useState<IEntry["type"] | "all">("all");
  const [filterCategory, setFilterCategory] = useState<number | null>(null);
  const [editing, setEditing] = useState<IEntry | null>(null);
  const [duplicating, setDuplicating] = useState<IEntry | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filteredEntries = useMemo(() => {
    const entries = query.data ?? [];
    return entries.filter((entry: IEntry) => {
      if (entry.date < dateFrom || entry.date > dateTo) return false;
      if (filterType !== "all" && entry.type !== filterType) return false;
      if (filterCategory && entry.category?.id !== filterCategory) return false;
      return true;
    });
  }, [query.data, dateFrom, dateTo, filterType, filterCategory]);

  const totalIncome = useMemo(
    () =>
      filteredEntries
        .filter((e) => e.type === EType.Income)
        .reduce((sum, e) => sum + Number(e.amount), 0),
    [filteredEntries],
  );

  const totalOutcome = useMemo(
    () =>
      filteredEntries
        .filter((e) => e.type === EType.Outcome)
        .reduce((sum, e) => sum + Number(e.amount), 0),
    [filteredEntries],
  );

  const handleChangeDateFrom = (value: string) => setDateFrom(value);
  const handleChangeDateTo = (value: string) => setDateTo(value);
  const handleChangeFilterCategory = (value: number | null) =>
    setFilterCategory(value);
  const handleChangeFilterType = (value: IEntry["type"] | "all") =>
    setFilterType(value);

  const handleClearFilters = () => {
    const { from, to } = getDefaultDates();
    setDateFrom(from);
    setDateTo(to);
    setFilterType("all");
    setFilterCategory(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditing(null);
    setDuplicating(null);
  };

  const handleDuplicate = (entry: IEntry) => {
    setDuplicating(entry);
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (entry: IEntry) => {
    setEditing(entry);
    setDuplicating(null);
    setShowForm(true);
  };

  const handleNewEntry = () => {
    setEditing(null);
    setDuplicating(null);
    setShowForm(true);
  };

  const handleRemove = async (id: number) => {
    await remove.mutateAsync(id);
  };

  const handleRemoveCreditGroup = async (creditGroupId: string) => {
    await removeCredit.mutateAsync(creditGroupId);
  };

  const handleSubmit = async (payload: IEntryPayload | ICreditEntryPayload) => {
    if (editing) {
      await update.mutateAsync({ id: editing.id, payload });
    } else {
      if ("installmentTotal" in payload) {
        await createCredit.mutateAsync(payload as ICreditEntryPayload);
      } else {
        await create.mutateAsync(payload);
      }
    }
    handleCloseForm();
  };

  return {
    dateFrom,
    dateTo,
    duplicating,
    editing,
    entries: filteredEntries,
    error: query.error,
    filterCategory,
    filterType,
    loading: query.isLoading,
    showForm,
    totalIncome,
    totalOutcome,
    handleChangeDateFrom,
    handleChangeDateTo,
    handleChangeFilterCategory,
    handleChangeFilterType,
    handleClearFilters,
    handleCloseForm,
    handleDuplicate,
    handleEdit,
    handleNewEntry,
    handleRemove,
    handleRemoveCreditGroup,
    handleSubmit,
  };
};

export default useEntriesPage;
