export interface IProfileInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  sex: "NOTSELECTED" | "MALE" | "FEMALE";
  password?: string;
}
