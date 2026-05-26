export const EMethod = {
  Debit: "debit",
  Credit: "credit",
} as const;

export type TMethod = (typeof EMethod)[keyof typeof EMethod];
