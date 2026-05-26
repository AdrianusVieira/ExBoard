export const formatInstallmentDate = (
  firstDate: string,
  index: number,
): string => {
  const date = new Date(firstDate);
  date.setMonth(date.getMonth() + index);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};
