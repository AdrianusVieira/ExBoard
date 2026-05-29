// Data needed to create a new recurrent + its first entry
export interface ICreateRecurrentDto {
  name: string;
  day: number;
  // First entry fields — cloned for future occurrences
  description: string;
  amount: number;
  categoryId?: number;
  notes?: string;
}

export interface IUpdateRecurrentDto {
  name?: string;
  day?: number;
}
