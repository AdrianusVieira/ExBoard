import useEntriesPage from "../hooks/useEntriesPage";
import { useCategoriesQuery } from "../../categories/hooks/useCategoriesQuery";
import EntryList from "./EntryList";
import EntryFilters from "./EntryFilters";
import EntryForm from "./EntryForm";
import RecurrentForm from "../../recurrents/components/RecurrentForm";
import { formatAmount } from "../utils/amount";
import { EType } from "../../../shared/types/TType";
import Nav from "../../../shared/components/Nav";

const TEXTS = {
  title: "Entries",
  buttons: {
    newEntry: "New entry",
    newRecurrent: "Recurrent income",
  },
  totals: {
    income: "Income",
    outcome: "Outcome",
  },
  loading: "Loading entries...",
  loadError: "Failed to load entries.",
};

const COLORS = {
  bg: "bg-[#f0efea]",
  text: {
    primary: "text-[#1a1a2e]",
    secondary: "text-[#6b6b80]",
  },
  income: {
    value: "text-[#0f6e56]",
    card: "bg-[#f5f5f7]",
  },
  outcome: {
    value: "text-[#a32d2d]",
    card: "bg-[#f5f5f7]",
  },
};

const EntriesPage = () => {
  const {
    dateFrom,
    dateTo,
    duplicating,
    editing,
    entries,
    error,
    filterCategory,
    filterType,
    loading,
    showForm,
    showRecurrentForm,
    totalIncome,
    totalOutcome,
    handleChangeDateFrom,
    handleChangeDateTo,
    handleChangeFilterCategory,
    handleChangeFilterType,
    handleClearFilters,
    handleCloseForm,
    handleCloseRecurrentForm,
    handleDuplicate,
    handleEdit,
    handleNewEntry,
    handleNewRecurrent,
    handleRemove,
    handleRemoveCreditGroup,
    handleSubmit,
    handleSubmitRecurrent,
  } = useEntriesPage();

  const { query: categoriesQuery } = useCategoriesQuery();
  const categories = categoriesQuery.data ?? [];

  const shouldRenderContent = !loading && !error;

  return (
    <div className={`min-h-screen ${COLORS.bg}`}>
      <Nav />

      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-lg font-semibold ${COLORS.text.primary}`}>
            {TEXTS.title}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleNewRecurrent}
              className="text-sm px-4 py-2 border border-[#6fcfae] bg-[#e1f5ee] text-[#0f6e56] rounded-md font-medium cursor-pointer flex items-center gap-2"
            >
              <i className="ti ti-repeat text-sm" />
              {TEXTS.buttons.newRecurrent}
            </button>
            <button
              onClick={handleNewEntry}
              className="text-sm px-4 py-2 bg-[#534ab7] text-white rounded-md font-medium cursor-pointer"
            >
              {TEXTS.buttons.newEntry}
            </button>
          </div>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`${COLORS.income.card} rounded-lg p-4`}>
            <p
              className={`text-xs uppercase tracking-wide ${COLORS.text.secondary} mb-1`}
            >
              {TEXTS.totals.income}
            </p>
            <p className={`text-xl font-semibold ${COLORS.income.value}`}>
              {formatAmount(totalIncome, EType.Income)}
            </p>
          </div>
          <div className={`${COLORS.outcome.card} rounded-lg p-4`}>
            <p
              className={`text-xs uppercase tracking-wide ${COLORS.text.secondary} mb-1`}
            >
              {TEXTS.totals.outcome}
            </p>
            <p className={`text-xl font-semibold ${COLORS.outcome.value}`}>
              {formatAmount(totalOutcome, EType.Outcome)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <EntryFilters
          categories={categories}
          dateFrom={dateFrom}
          dateTo={dateTo}
          filterCategory={filterCategory}
          filterType={filterType}
          onChangeDateFrom={handleChangeDateFrom}
          onChangeDateTo={handleChangeDateTo}
          onChangeFilterCategory={handleChangeFilterCategory}
          onChangeFilterType={handleChangeFilterType}
          onClearFilters={handleClearFilters}
        />

        {/* List */}
        {loading && (
          <p className={`text-sm ${COLORS.text.secondary}`}>{TEXTS.loading}</p>
        )}
        {error && <p className="text-sm text-red-500">{TEXTS.loadError}</p>}
        {shouldRenderContent && (
          <EntryList
            entries={entries}
            onDuplicate={handleDuplicate}
            onEdit={handleEdit}
            onRemove={handleRemove}
            onRemoveCreditGroup={handleRemoveCreditGroup}
          />
        )}
      </div>

      {showForm && (
        <EntryForm
          categories={categories}
          duplicating={duplicating}
          editing={editing}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}

      {showRecurrentForm && (
        <RecurrentForm
          categories={categories}
          onClose={handleCloseRecurrentForm}
          onSubmit={handleSubmitRecurrent}
        />
      )}
    </div>
  );
};

export default EntriesPage;
