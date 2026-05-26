import { Pencil, Trash2 } from "lucide-react";
import type ICategory from "../../../shared/interfaces/ICategory";
import { EType } from "../../../shared/types/TType";

const TEXTS = {
  type: {
    income: "Income",
    outcome: "Outcome",
  },
};

const COLORS = {
  income: {
    dot: "bg-[#0f6e56]",
  },
  outcome: {
    dot: "bg-[#a32d2d]",
  },
  border: "border-black/10",
  text: {
    primary: "text-[#1a1a2e]",
    secondary: "text-[#6b6b80]",
  },
};

interface Props {
  categories: ICategory[];
  onEdit: (category: ICategory) => void;
  onRemove: (id: number) => void;
}

const CategoryList = ({ categories, onEdit, onRemove }: Props) => (
  <div className="flex flex-col gap-2">
    {categories.map((category: ICategory) => (
      <div
        key={category.id}
        className={`flex items-center justify-between p-3 border ${COLORS.border} rounded-lg bg-white`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${category.type === EType.Income ? COLORS.income.dot : COLORS.outcome.dot}`}
          />
          <div>
            <p className={`text-sm font-medium ${COLORS.text.primary}`}>
              {category.name}
            </p>
            <p className={`text-xs ${COLORS.text.secondary}`}>
              {category.type === EType.Income
                ? TEXTS.type.income
                : TEXTS.type.outcome}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(category)}
            className="text-[#6b6b80] hover:text-[#1a1a2e] p-1"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRemove(category.id)}
            className="text-[#6b6b80] hover:text-[#a32d2d] p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default CategoryList;
