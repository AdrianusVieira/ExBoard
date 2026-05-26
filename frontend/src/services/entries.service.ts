import type IEntry from "../shared/interfaces/IEntry";
import type { IEntryPayload } from "../shared/interfaces/IEntryPayload";
import http from "./http";

export interface ICreditEntryPayload extends IEntryPayload {
  installmentTotal: number;
  firstDueDate: string;
}

const getEntries = async (): Promise<IEntry[]> => {
  const { data } = await http.get("/entries");
  return data;
};

const createEntry = async (payload: IEntryPayload): Promise<IEntry> => {
  const { data } = await http.post("/entries", payload);
  return data;
};

const createCreditEntry = async (
  payload: ICreditEntryPayload,
): Promise<IEntry[]> => {
  const { data } = await http.post("/entries/credit", payload);
  return data;
};

const updateEntry = async (
  id: number,
  payload: IEntryPayload,
): Promise<IEntry> => {
  const { data } = await http.put(`/entries/${id}`, payload);
  return data;
};

const deleteEntry = async (id: number): Promise<void> => {
  await http.delete(`/entries/${id}`);
};

const deleteCreditGroup = async (creditGroupId: string): Promise<void> => {
  await http.delete(`/entries/credit/${creditGroupId}`);
};

export {
  getEntries,
  createEntry,
  createCreditEntry,
  updateEntry,
  deleteEntry,
  deleteCreditGroup,
};
