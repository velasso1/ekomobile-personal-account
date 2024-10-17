const beautifyNumber = (tenDigitString: string) => {
  const prefixRegion = "+7";
  return `${prefixRegion} (${tenDigitString.slice(0, 3)}) ${tenDigitString.slice(3, 6)}-${tenDigitString.slice(6, 8)}-${tenDigitString.slice(8)}`;
};

export default beautifyNumber