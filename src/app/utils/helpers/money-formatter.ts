export const moneyFormatter = (value: number): string => {
  const remindValue: string[] = (value / 100).toString().split(".");

  const formattedValue = remindValue[0].split('');
  // formatting a whole part value if it more than 999;
  if (+remindValue[0] > 999) {
    // insert a space " " after first letter (like 1234 => 1 234);
    formattedValue.splice(1, 0, " ");

    if (remindValue.length === 2) {
      // if we have 2 values in array, connect and separate them with a comma;
      return formattedValue.join('') + ',' + (remindValue[1].length === 1 ? remindValue[1] + 0 : remindValue[1])
    }

    return formattedValue + ",00";
  }
  // if value less then 999 and has no remainder, just return this value with ",00"
  return remindValue[0] + ",00";
};
