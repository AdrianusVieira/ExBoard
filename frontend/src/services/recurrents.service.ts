import http from "./http";
import type {
  IRecurrent,
  ICreateRecurrentPayload,
} from "../shared/interfaces/IRecurrent";

const getRecurrents = async (): Promise<IRecurrent[]> => {
  const { data } = await http.get("/recurrents");
  return data;
};

const createRecurrent = async (
  payload: ICreateRecurrentPayload,
): Promise<IRecurrent> => {
  const { data } = await http.post("/recurrents", payload);
  return data;
};

const updateRecurrent = async (
  id: string,
  payload: Partial<Pick<IRecurrent, "name" | "day">>,
): Promise<IRecurrent> => {
  const { data } = await http.put(`/recurrents/${id}`, payload);
  return data;
};

const deleteRecurrent = async (id: string): Promise<void> => {
  await http.delete(`/recurrents/${id}`);
};

const advanceRecurrents = async (): Promise<{ advanced: number }> => {
  const { data } = await http.post("/recurrents/advance");
  return data;
};

export {
  getRecurrents,
  createRecurrent,
  updateRecurrent,
  deleteRecurrent,
  advanceRecurrents,
};
