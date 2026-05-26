import type IEntry from "../../../shared/interfaces/IEntry";
import { EType } from "../../../shared/types/TType";

export const formatAmount = (amount: number, type: IEntry["type"]) => {
  const formatted = Number(amount).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return type === EType.Income ? `+ R$ ${formatted}` : `- R$ ${formatted}`;
};
