import type ICategory from "../../../shared/interfaces/ICategory";
import type IEntry from "../../../shared/interfaces/IEntry";

const TEXTS = {
  labels: {
    from: "From",
    to: "To",
    category: "All categories",
  },
  pills: {
    all: "All",
    income: "Income",
    outcome: "Outcome",
  },
  buttons: {
    clear: "Clear",
  },
};

const COLORS = {
  border: "border-black/10",
  text: {
    primary: "text-[#1a1a2e]",
    secondary: "text-[#6b6b80]",
  },
  pill: {
    active: "bg-[#eeedfe] text-[#3c3489] border-[#afa9ec]",
    inactive: "bg-white text-[#6b6b80] border-black/10",
  },
};

interface Props {
  categories: ICategory[];
  dateFrom: string;
  dateTo: string;
  filterCategory: number | null;
  filterType: IEntry["type"] | "all";
  onChangeDateFrom: (value: string) => void;
  onChangeDateTo: (value: string) => void;
  onChangeFilterCategory: (value: number | null) => void;
  onChangeFilterType: (value: IEntry["type"] | "all") => void;
  onClearFilters: () => void;
}

const EntryFilters = ({
  categories,
  dateFrom,
  dateTo,
  filterCategory,
  filterType,
  onChangeDateFrom,
  onChangeDateTo,
  onChangeFilterCategory,
  onChangeFilterType,
  onClearFilters,
}: Props) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`text-sm ${COLORS.text.secondary}`}>
        {TEXTS.labels.from}
      </span>
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => onChangeDateFrom(e.target.value)}
        className={`text-sm px-3 py-1.5 border ${COLORS.border} rounded-md bg-white ${COLORS.text.primary}`}
      />
      <span className={`text-sm ${COLORS.text.secondary}`}>
        {TEXTS.labels.to}
      </span>
      <input
        type="date"
        value={dateTo}
        onChange={(e) => onChangeDateTo(e.target.value)}
        className={`text-sm px-3 py-1.5 border ${COLORS.border} rounded-md bg-white ${COLORS.text.primary}`}
      />
      <select
        value={filterCategory ?? ""}
        onChange={(e) =>
          onChangeFilterCategory(e.target.value ? Number(e.target.value) : null)
        }
        className={`text-sm px-3 py-1.5 border ${COLORS.border} rounded-md bg-white ${COLORS.text.secondary} cursor-pointer`}
      >
        <option value="">{TEXTS.labels.category}</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button
        onClick={onClearFilters}
        className={`text-sm px-3 py-1.5 border ${COLORS.border} rounded-md ${COLORS.text.secondary} hover:${COLORS.text.primary} cursor-pointer bg-white`}
      >
        {TEXTS.buttons.clear}
      </button>
    </div>
    <div className="flex gap-2">
      {(["all", "income", "outcome"] as const).map((t) => (
        <button
          key={t}
          onClick={() => onChangeFilterType(t)}
          className={`text-xs px-3 py-1 rounded-full border transition-colors cursor-pointer ${filterType === t ? COLORS.pill.active : COLORS.pill.inactive}`}
        >
          {TEXTS.pills[t]}
        </button>
      ))}
    </div>
  </div>
);

export default EntryFilters;
