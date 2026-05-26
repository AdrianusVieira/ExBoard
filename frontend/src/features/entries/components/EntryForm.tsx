import { useState } from "react";
import type IEntry from "../../../shared/interfaces/IEntry";
import type ICategory from "../../../shared/interfaces/ICategory";
import { EType } from "../../../shared/types/TType";
import type { IEntryPayload } from "../../../shared/interfaces/IEntryPayload";
import type { ICreditEntryPayload } from "../../../services/entries.service";
import { EMethod } from "../../../shared/types/TMethod";
import { formatInstallmentDate } from "../utils/date";

const TEXTS = {
  title: {
    new: "New entry",
    edit: "Edit entry",
    duplicate: "Duplicate entry",
  },
  buttons: {
    cancel: "Cancel",
    save: "Save",
  },
  labels: {
    type: "Type",
    method: "Method",
    description: "Description",
    amount: "Amount (R$)",
    date: "Date",
    category: "Category",
    notes: "Notes",
    installments: "Total installments",
    firstDueDate: "First due date",
  },
  placeholders: {
    description: "e.g. May salary",
    amount: "0.00",
    notes: "Optional...",
    category: "Select a category",
  },
  type: {
    income: "Income",
    outcome: "Outcome",
  },
  method: {
    debit: "Debit",
    credit: "Credit",
  },
  credit: {
    label: "Installments",
    preview: "Preview",
    total: "Total",
    more: (n: number) => `+ ${n} more installments`,
  },
};

const COLORS = {
  border: "border-black/10",
  text: {
    primary: "text-[#1a1a2e]",
    secondary: "text-[#6b6b80]",
  },
  income: {
    active: "bg-[#e1f5ee] text-[#0f6e56]",
  },
  outcome: {
    active: "bg-[#fcebeb] text-[#a32d2d]",
  },
  credit: {
    active: "bg-[#faeeda] text-[#633806]",
    section: "bg-[#faeeda] border-[#fac775]",
    preview: "bg-white border-[#fac775]",
    previewRow: "border-black/10 text-[#6b6b80]",
    previewTotal: "text-[#1a1a2e] font-semibold",
  },
  inactive: "bg-white text-[#6b6b80]",
  button: {
    primary: "bg-[#534ab7] text-white",
  },
};

interface Props {
  categories: ICategory[];
  duplicating: IEntry | null;
  editing: IEntry | null;
  onClose: () => void;
  onSubmit: (payload: IEntryPayload | ICreditEntryPayload) => void;
}

const EntryForm = ({
  categories,
  duplicating,
  editing,
  onClose,
  onSubmit,
}: Props) => {
  const initial = editing ?? duplicating;

  const [type, setType] = useState<IEntry["type"]>(
    initial?.type ?? EType.Income,
  );
  const [method, setMethod] = useState<IEntry["method"]>(
    initial?.method ?? EMethod.Debit,
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [amount, setAmount] = useState(initial?.amount?.toString() ?? "");
  const [date, setDate] = useState(
    initial?.date ?? new Date().toISOString().split("T")[0],
  );
  const [categoryId, setCategoryId] = useState<number | "">(
    initial?.category?.id ?? "",
  );
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [installmentTotal, setInstallmentTotal] = useState("");
  const [firstDueDate, setFirstDueDate] = useState("");

  const isCredit = method === EMethod.Credit;
  const installmentAmount =
    isCredit && amount && installmentTotal
      ? Number(amount) / Number(installmentTotal)
      : 0;

  const previewRows =
    isCredit && installmentTotal && firstDueDate
      ? Array.from(
          { length: Math.min(Number(installmentTotal), 3) },
          (_, i) => ({
            label: `${formatInstallmentDate(firstDueDate, i)} — ${i + 1}/${installmentTotal}`,
            amount: installmentAmount.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            }),
          }),
        )
      : [];

  const remainingInstallments = Number(installmentTotal) - 3;

  const handleSubmit = () => {
    if (!description.trim() || !amount || !date) return;

    const base: IEntryPayload = {
      description,
      amount: Number(amount),
      type,
      method,
      date,
      notes: notes || undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
    };

    if (isCredit && installmentTotal && firstDueDate) {
      onSubmit({
        ...base,
        installmentTotal: Number(installmentTotal),
        firstDueDate,
      } as ICreditEntryPayload);
    } else {
      onSubmit(base);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-xl border ${COLORS.border} p-6 w-full max-w-md flex flex-col gap-4 max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between">
          <p className={`text-sm font-semibold ${COLORS.text.primary}`}>
            {editing
              ? TEXTS.title.edit
              : duplicating
                ? TEXTS.title.duplicate
                : TEXTS.title.new}
          </p>
          <button
            onClick={onClose}
            className="text-[#6b6b80] hover:text-[#1a1a2e] cursor-pointer"
          >
            <i className="ti ti-x text-sm" />
          </button>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-1">
          <label className={`text-xs ${COLORS.text.secondary}`}>
            {TEXTS.labels.type}
          </label>
          <div
            className={`flex border ${COLORS.border} rounded-md overflow-hidden`}
          >
            <button
              onClick={() => setType(EType.Income)}
              className={`flex-1 text-sm py-2 font-medium transition-colors cursor-pointer ${type === EType.Income ? COLORS.income.active : COLORS.inactive}`}
            >
              {TEXTS.type.income}
            </button>
            <button
              onClick={() => setType(EType.Outcome)}
              className={`flex-1 text-sm py-2 font-medium transition-colors cursor-pointer ${type === EType.Outcome ? COLORS.outcome.active : COLORS.inactive}`}
            >
              {TEXTS.type.outcome}
            </button>
          </div>
        </div>

        {/* Method */}
        <div className="flex flex-col gap-1">
          <label className={`text-xs ${COLORS.text.secondary}`}>
            {TEXTS.labels.method}
          </label>
          <div
            className={`flex border ${COLORS.border} rounded-md overflow-hidden`}
          >
            <button
              onClick={() => setMethod("debit")}
              className={`flex-1 text-sm py-2 font-medium transition-colors cursor-pointer ${method === "debit" ? COLORS.outcome.active : COLORS.inactive}`}
            >
              {TEXTS.method.debit}
            </button>
            <button
              onClick={() => setMethod("credit")}
              className={`flex-1 text-sm py-2 font-medium transition-colors cursor-pointer ${method === "credit" ? COLORS.credit.active : COLORS.inactive}`}
            >
              {TEXTS.method.credit}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className={`text-xs ${COLORS.text.secondary}`}>
            {TEXTS.labels.description}
          </label>
          <input
            type="text"
            placeholder={TEXTS.placeholders.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full border ${COLORS.border} rounded-md px-3 py-2 text-sm`}
          />
        </div>

        {/* Amount + Date */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className={`text-xs ${COLORS.text.secondary}`}>
              {TEXTS.labels.amount}
            </label>
            <input
              type="number"
              placeholder={TEXTS.placeholders.amount}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full border ${COLORS.border} rounded-md px-3 py-2 text-sm`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={`text-xs ${COLORS.text.secondary}`}>
              {TEXTS.labels.date}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full border ${COLORS.border} rounded-md px-3 py-2 text-sm`}
            />
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className={`text-xs ${COLORS.text.secondary}`}>
            {TEXTS.labels.category}
          </label>
          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value ? Number(e.target.value) : "")
            }
            className={`w-full border ${COLORS.border} rounded-md px-3 py-2 text-sm cursor-pointer`}
          >
            <option value="">{TEXTS.placeholders.category}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-1">
          <label className={`text-xs ${COLORS.text.secondary}`}>
            {TEXTS.labels.notes}
          </label>
          <input
            type="text"
            placeholder={TEXTS.placeholders.notes}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`w-full border ${COLORS.border} rounded-md px-3 py-2 text-sm`}
          />
        </div>

        {/* Credit section */}
        {isCredit && (
          <div
            className={`flex flex-col gap-3 border ${COLORS.credit.section} rounded-md p-3`}
          >
            <p
              className={`text-xs font-semibold text-[#633806] uppercase tracking-wide`}
            >
              {TEXTS.credit.label}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className={`text-xs ${COLORS.text.secondary}`}>
                  {TEXTS.labels.installments}
                </label>
                <input
                  type="number"
                  placeholder="12"
                  value={installmentTotal}
                  onChange={(e) => setInstallmentTotal(e.target.value)}
                  className={`w-full border ${COLORS.border} rounded-md px-3 py-2 text-sm`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className={`text-xs ${COLORS.text.secondary}`}>
                  {TEXTS.labels.firstDueDate}
                </label>
                <input
                  type="date"
                  value={firstDueDate}
                  onChange={(e) => setFirstDueDate(e.target.value)}
                  className={`w-full border ${COLORS.border} rounded-md px-3 py-2 text-sm`}
                />
              </div>
            </div>
            {previewRows.length > 0 && (
              <div
                className={`border ${COLORS.credit.preview} rounded-md overflow-hidden`}
              >
                {previewRows.map((row, i) => (
                  <div
                    key={i}
                    className={`flex justify-between text-xs px-3 py-2 border-b ${COLORS.credit.previewRow}`}
                  >
                    <span>{row.label}</span>
                    <span>R$ {row.amount}</span>
                  </div>
                ))}
                {remainingInstallments > 0 && (
                  <div
                    className={`flex justify-between text-xs px-3 py-2 border-b ${COLORS.credit.previewRow} italic`}
                  >
                    <span>{TEXTS.credit.more(remainingInstallments)}</span>
                  </div>
                )}
                <div
                  className={`flex justify-between text-xs px-3 py-2 ${COLORS.credit.previewTotal}`}
                >
                  <span>{TEXTS.credit.total}</span>
                  <span>
                    R${" "}
                    {Number(amount).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className={`text-sm px-4 py-2 border ${COLORS.border} rounded-md ${COLORS.text.secondary} cursor-pointer`}
          >
            {TEXTS.buttons.cancel}
          </button>
          <button
            onClick={handleSubmit}
            className={`text-sm px-4 py-2 ${COLORS.button.primary} rounded-md font-medium cursor-pointer`}
          >
            {TEXTS.buttons.save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;
