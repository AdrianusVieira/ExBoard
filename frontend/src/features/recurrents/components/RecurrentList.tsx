import { Trash2 } from "lucide-react";
import type { IRecurrent } from "../../../shared/interfaces/IRecurrent";

const COLORS = {
  border: "border-black/10",
  text: {
    primary: "text-[#1a1a2e]",
    secondary: "text-[#6b6b80]",
  },
  recurrent: {
    dot: "bg-[#0f6e56]",
    badge: "bg-[#e1f5ee] text-[#0f6e56] border-[#6fcfae]",
  },
};

interface Props {
  recurrents: IRecurrent[];
  onRemove: (id: string) => void;
}

const RecurrentList = ({ recurrents, onRemove }: Props) => {
  if (!recurrents.length) {
    return (
      <p className={`text-sm ${COLORS.text.secondary}`}>
        No recurrent incomes yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {recurrents.map((recurrent) => (
        <div
          key={recurrent.id}
          className={`flex items-center justify-between p-3 border ${COLORS.border} rounded-lg bg-white`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${COLORS.recurrent.dot}`}
            />
            <div>
              <p className={`text-sm font-medium ${COLORS.text.primary}`}>
                {recurrent.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${COLORS.recurrent.badge}`}
                >
                  <i className="ti ti-repeat text-xs mr-1" />
                  monthly · day {recurrent.day}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onRemove(recurrent.id)}
            className="text-[#6b6b80] hover:text-[#a32d2d] p-1 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecurrentList;
