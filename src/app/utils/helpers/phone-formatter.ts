export const formatPhoneNumber = (phoneNumber: string): string => {
  const clearPhoneNumber = phoneNumber.replace(/\D/g, "");

  const formattedNumber = clearPhoneNumber
    .replace(/(^\+7|7|8)?(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, "+7 ($2) $3-$4-$5")
    .trim();

  return formattedNumber;
};
