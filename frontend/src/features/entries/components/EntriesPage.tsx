import { NavLink } from "react-router-dom";
import useEntriesPage from "../hooks/useEntriesPage";
import { useCategoriesQuery } from "../../categories/hooks/useCategoriesQuery";
import EntryList from "./EntryList";
import EntryFilters from "./EntryFilters";
import EntryForm from "./EntryForm";
import { formatAmount } from "../utils/amount";
import { EType } from "../../../shared/types/TType";

const TEXTS = {
  brand: "Ex Board",
  title: "Entries",
  nav: {
    entries: "Entries",
    categories: "Categories",
  },
  buttons: {
    newEntry: "New entry",
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
  nav: "bg-white border-b border-black/10",
  border: "border-black/10",
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
  } = useEntriesPage();

  const { query: categoriesQuery } = useCategoriesQuery();
  const categories = categoriesQuery.data ?? [];

  const shouldRenderContent = !loading && !error;

  const showLoading = () => (
    <p className={`text-sm ${COLORS.text.secondary}`}>{TEXTS.loading}</p>
  );

  const showError = () => (
    <p className="text-sm text-red-500">{TEXTS.loadError}</p>
  );

  return (
    <div className={`min-h-screen ${COLORS.bg}`}>
      <nav
        className={`${COLORS.nav} px-6 py-3 flex items-center justify-between`}
      >
        <span className={`text-sm font-semibold ${COLORS.text.primary}`}>
          {TEXTS.brand}
        </span>
        <div className="flex gap-1">
          <NavLink
            to="/entries"
            className={({ isActive }) =>
              `text-sm px-3 py-1.5 rounded-md transition-colors ${isActive ? "bg-[#f5f5f7] text-[#1a1a2e] font-medium" : "text-[#6b6b80] hover:text-[#1a1a2e]"}`
            }
          >
            {TEXTS.nav.entries}
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `text-sm px-3 py-1.5 rounded-md transition-colors ${isActive ? "bg-[#f5f5f7] text-[#1a1a2e] font-medium" : "text-[#6b6b80] hover:text-[#1a1a2e]"}`
            }
          >
            {TEXTS.nav.categories}
          </NavLink>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-lg font-semibold ${COLORS.text.primary}`}>
            {TEXTS.title}
          </h1>
          <button
            onClick={handleNewEntry}
            className="text-sm px-4 py-2 bg-[#534ab7] text-white rounded-md font-medium cursor-pointer"
          >
            {TEXTS.buttons.newEntry}
          </button>
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
        {loading && showLoading()}
        {error && showError()}
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

      {/* Form modal */}
      {showForm && (
        <EntryForm
          categories={categories}
          duplicating={duplicating}
          editing={editing}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default EntriesPage;
