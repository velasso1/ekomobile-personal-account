export const moneyFormatter = (value: number): string => {
  const remindValue: string[] = (value / 100).toString().split(".");

  if (remindValue.length === 2) {
    return remindValue.map((item, index) => (index === 1 && item.length === 1 ? item + 0 : item)).join(",");
  }

  return remindValue[0] + ",00";
};
