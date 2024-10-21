// field types of state in mainPage

interface IRemainderInfo {
  type: string;
  size: number;
  total: number;
  isUnlimited: boolean;
}

export interface IPartsInfo {
  type: string;
  amount: number;
}

interface IExpensesInfo {
  total: number;
  parts: IPartsInfo[];
}

export interface IMainPageUserInfo {
  contactName: string;
  contactPhone: string;
  planName: string;
  balance: number;
  numberIsActive: boolean;
  remainders: IRemainderInfo[];
  expenses: IExpensesInfo;
}

// types for verification query on main page

export interface IVerificationData {
  me: {
    account: {
      isContactPhoneVerified: boolean;
      isEmailVerified: boolean;
    };
  };
}
