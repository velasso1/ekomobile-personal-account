export interface IProfileInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  sex: "NOTSELECTED" | "MALE" | "FEMALE";
  password?: string;
}

export interface ISecretCodeState {
  error: {
    errorStatus: boolean;
    errorMessage: string;
  };
  loading: boolean;
  identifiers: {
    actionId: string;
    correlationId: string;
    passwordChangeId: string;
    verificationId: string | null;
  };
}
