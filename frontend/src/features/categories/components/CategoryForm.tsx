import type ICategory from "../../../shared/interfaces/ICategory";
import { EType } from "../../../shared/types/TType";

const TEXTS = {
  buttons: {
    add: "Add category",
    cancel: "Cancel",
    update: "Update category",
  },
  form: {
    editTitle: "Edit category",
    newTitle: "New category",
  },
  placeholders: {
    description: "Optional description...",
    name: "Category name",
  },
  type: {
    income: "Income",
    outcome: "Outcome",
  },
};

const COLORS = {
  income: {
    dot: "bg-[#0f6e56]",
    active: "bg-[#e1f5ee] text-[#0f6e56]",
  },
  outcome: {
    dot: "bg-[#a32d2d]",
    active: "bg-[#fcebeb] text-[#a32d2d]",
  },
  inactive: "bg-white text-[#6b6b80]",
  border: "border-black/10",
  text: {
    primary: "text-[#1a1a2e]",
    secondary: "text-[#6b6b80]",
  },
  button: {
    primary: "bg-[#534ab7] text-white",
  },
};

interface Props {
  description: string;
  editing: ICategory | null;
  name: string;
  type: ICategory["type"];
  onCancel: () => void;
  onChangeDescription: (value: string) => void;
  onChangeName: (value: string) => void;
  onChangeType: (value: ICategory["type"]) => void;
  onSubmit: () => void;
}

const CategoryForm = ({
  description,
  editing,
  name,
  type,
  onCancel,
  onChangeDescription,
  onChangeName,
  onChangeType,
  onSubmit,
}: Props) => (
  <div
    className={`flex flex-col gap-3 border ${COLORS.border} rounded-lg bg-white p-4`}
  >
    <p className={`text-sm font-medium ${COLORS.text.primary}`}>
      {editing ? TEXTS.form.editTitle : TEXTS.form.newTitle}
    </p>
    <input
      type="text"
      placeholder={TEXTS.placeholders.name}
      value={name}
      onChange={(e) => onChangeName(e.target.value)}
      className={`w-full border ${COLORS.border} rounded-md px-3 py-2 text-sm`}
    />
    <div className={`flex border ${COLORS.border} rounded-md overflow-hidden`}>
      <button
        onClick={() => onChangeType(EType.Income)}
        className={`flex-1 text-sm py-2 font-medium transition-colors ${type === EType.Income ? COLORS.income.active : COLORS.inactive}`}
      >
        {TEXTS.type.income}
      </button>
      <button
        onClick={() => onChangeType(EType.Outcome)}
        className={`flex-1 text-sm py-2 font-medium transition-colors ${type === EType.Outcome ? COLORS.outcome.active : COLORS.inactive}`}
      >
        {TEXTS.type.outcome}
      </button>
    </div>
    <textarea
      placeholder={TEXTS.placeholders.description}
      value={description}
      onChange={(e) => onChangeDescription(e.target.value)}
      className={`w-full border ${COLORS.border} rounded-md px-3 py-2 text-sm resize-none h-20`}
    />
    <div className="flex gap-2 justify-end">
      {editing && (
        <button
          onClick={onCancel}
          className={`text-sm px-4 py-2 border ${COLORS.border} rounded-md ${COLORS.text.secondary}`}
        >
          {TEXTS.buttons.cancel}
        </button>
      )}
      <button
        onClick={onSubmit}
        className={`text-sm px-4 py-2 ${COLORS.button.primary} rounded-md font-medium`}
      >
        {editing ? TEXTS.buttons.update : TEXTS.buttons.add}
      </button>
    </div>
  </div>
);

export default CategoryForm;
