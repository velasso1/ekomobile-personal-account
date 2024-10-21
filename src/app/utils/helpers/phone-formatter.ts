export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+7 ($1) $2-$3-$4");
};
