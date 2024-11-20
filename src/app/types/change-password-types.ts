export interface IChangePasswordState {
  newPassword: string;
  repeatNewPassword: string;
  secretKey: string;
}

export interface ICreatePasswordChangeResponse {
  data: {
    passwordChangeCreate: {
      deadline: string;
      verificationId: string;
    };
  };
}
