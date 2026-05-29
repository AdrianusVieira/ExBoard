export interface IRecurrent {
  id: string;
  name: string;
  day: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateRecurrentPayload {
  name: string;
  day: number;
  // First entry fields — cloned for future occurrences
  description: string;
  amount: number;
  categoryId?: number;
  notes?: string;
}
