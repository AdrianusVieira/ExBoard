import { useState } from "react";
import type ICategory from "../../../shared/interfaces/ICategory";
import type { ICreateRecurrentPayload } from "../../../shared/interfaces/IRecurrent";

const TEXTS = {
  title: "New recurrent income",
  subtitle: "Generates a monthly income entry automatically.",
  labels: {
    name: "Source name",
    day: "Day of month",
    description: "Entry description",
    amount: "Amount (R$)",
    category: "Category",
    notes: "Notes",
  },
  placeholders: {
    name: "e.g. Salary, Freelance retainer",
    description: "e.g. May salary",
    amount: "0.00",
    category: "Select a category",
    notes: "Optional...",
  },
  dayNote: "Capped at 28 to work every month.",
  buttons: {
    cancel: "Cancel",
    save: "Save recurrent",
  },
};

const COLORS = {
  border: "border-black/10",
  text: {
    primary: "text-[#1a1a2e]",
    secondary: "text-[#6b6b80]",
  },
  recurrent: {
    badge: "bg-[#e1f5ee] text-[#0f6e56] border-[#6fcfae]",
    section: "bg-[#e1f5ee] border-[#6fcfae]",
  },
  button: {
    primary: "bg-[#534ab7] text-white",
  },
};

interface Props {
  categories: ICategory[];
  onClose: () => void;
  onSubmit: (payload: ICreateRecurrentPayload) => void;
}

const RecurrentForm = ({ categories, onClose, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [day, setDay] = useState("15");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !day || !description.trim() || !amount) return;

    onSubmit({
      name,
      day: Math.min(Number(day), 28),
      description,
      amount: Number(amount),
      categoryId: categoryId ? Number(categoryId) : undefined,
      notes: notes || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-xl border ${COLORS.border} p-6 w-full max-w-md flex flex-col gap-4 max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-semibold ${COLORS.text.primary}`}>
              {TEXTS.title}
            </p>
            <p className={`text-xs ${COLORS.text.secondary} mt-0.5`}>
              {TEXTS.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#6b6b80] hover:text-[#1a1a2e] cursor-pointer"
          >
            <i className="ti ti-x text-sm" />
          </button>
        </div>

        {/* Recurrent rule section */}
        <div
          className={`flex flex-col gap-3 border ${COLORS.recurrent.section} rounded-md p-3`}
        >
          <p className="text-xs font-semibold text-[#0f6e56] uppercase tracking-wide">
            Recurrence rule
          </p>

          <div className="flex flex-col gap-1">
            <label className={`text-xs ${COLORS.text.secondary}`}>
              {TEXTS.labels.name}
            </label>
            <input
              type="text"
              placeholder={TEXTS.placeholders.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full border ${COLORS.border} rounded-md px-3 py-2 text-sm bg-white`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={`text-xs ${COLORS.text.secondary}`}>
              {TEXTS.labels.day}
            </label>
            <input
              type="number"
              min={1}
              max={28}
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={`w-full border ${COLORS.border} rounded-md px-3 py-2 text-sm bg-white`}
            />
            <p className="text-xs text-[#0f6e56]">{TEXTS.dayNote}</p>
          </div>
        </div>

        {/* First entry fields */}
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

export default RecurrentForm;
