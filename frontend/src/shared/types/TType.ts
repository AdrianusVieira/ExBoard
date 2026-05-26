export const EType = {
  Income: "income",
  Outcome: "outcome",
} as const;

export type TType = (typeof EType)[keyof typeof EType];
