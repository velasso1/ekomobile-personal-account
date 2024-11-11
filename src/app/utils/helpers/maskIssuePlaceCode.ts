const maskIssuePlaceCode = (value: string): string => {
  value = value.replace(/[^\d]/g, "");
  if (value.length > 3) {
    value = value.slice(0, 3) + "-" + value.slice(3, 6);
  }
  return value;
};
export default maskIssuePlaceCode;
