export interface IProfileInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  sex: "0" | "MALE" | "FEMALE";
  password?: string;
}
