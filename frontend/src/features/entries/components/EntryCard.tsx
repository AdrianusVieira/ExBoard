import { Pencil, Trash2, Copy } from "lucide-react";
import type IEntry from "../../../shared/interfaces/IEntry";
import { EType } from "../../../shared/types/TType";
import { formatAmount } from "../utils/amount";

const COLORS = {
  border: "border-black/10",
  text: {
    primary: "text-[#1a1a2e]",
    secondary: "text-[#6b6b80]",
  },
  income: {
    icon: "bg-[#e1f5ee] text-[#0f6e56]",
    amount: "text-[#0f6e56]",
  },
  outcome: {
    icon: "bg-[#fcebeb] text-[#a32d2d]",
    amount: "text-[#a32d2d]",
  },
  credit: {
    badge: "bg-[#faeeda] text-[#633806] border-[#fac775]",
  },
  recurrent: {
    badge: "bg-[#e1f5ee] text-[#0f6e56] border-[#6fcfae]",
  },
  category: {
    badge: "bg-[#f5f5f7] text-[#6b6b80]",
  },
};

interface Props {
  entry: IEntry;
  onDuplicate: (entry: IEntry) => void;
  onEdit: (entry: IEntry) => void;
  onRemove: (id: number) => void;
  onRemoveCreditGroup: (creditGroupId: string) => void;
}

const EntryCard = ({
  entry,
  onDuplicate,
  onEdit,
  onRemove,
  onRemoveCreditGroup,
}: Props) => {
  const isIncome = entry.type === EType.Income;
  const isCredit = entry.method === "credit";
  const isRecurrent = !!entry.recurrentId;
  const colors = isIncome ? COLORS.income : COLORS.outcome;

  const handleDelete = () => {
    if (isCredit && entry.creditGroupId) {
      onRemoveCreditGroup(entry.creditGroupId);
    } else {
      onRemove(entry.id);
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 border ${COLORS.border} rounded-lg bg-white`}
    >
      <div
        className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${colors.icon}`}
      >
        <i
          className={`ti ${isIncome ? "ti-arrow-up" : "ti-arrow-down"} text-sm`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${COLORS.text.primary} truncate`}>
          {entry.description}
        </p>
        <div className={`flex items-center gap-2 mt-1 flex-wrap`}>
          <span className={`text-xs ${COLORS.text.secondary}`}>
            {entry.date}
          </span>
          {isRecurrent && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${COLORS.recurrent.badge}`}
            >
              <i className="ti ti-repeat text-xs mr-1" />
              monthly
            </span>
          )}
          {isCredit && entry.installmentNumber && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${COLORS.credit.badge}`}
            >
              <i className="ti ti-credit-card text-xs mr-1" />
              {entry.installmentNumber}/{entry.installmentTotal}
            </span>
          )}
          {entry.category && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${COLORS.category.badge}`}
            >
              {entry.category.name}
            </span>
          )}
        </div>
      </div>
      <span
        className={`text-sm font-semibold whitespace-nowrap ${colors.amount}`}
      >
        {formatAmount(entry.amount, entry.type)}
      </span>
      <div className="flex gap-1">
        <button
          onClick={() => onDuplicate(entry)}
          className="text-[#6b6b80] hover:text-[#1a1a2e] p-1 cursor-pointer"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(entry)}
          className="text-[#6b6b80] hover:text-[#1a1a2e] p-1 cursor-pointer"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="text-[#6b6b80] hover:text-[#a32d2d] p-1 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EntryCard;
