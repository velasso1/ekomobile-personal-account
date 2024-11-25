export interface IChangePasswordState {
  newPassword: string;
  repeatNewPassword: string;
  secretKey: string;
}

export interface ICreatePasswordChangeResponse {
   passwordChangeCreate: {
     deadline: string;
     verificationId: string;
   };
};

export interface ISubmitSecretKeyResponse {
  verificationSubmit: {
    result: {
      notice: string;
      isSuccess: boolean;
    }
  }
}
