// types of response fields to a request for full account data

import { IPartsInfo } from "./mainpage-userinfo-types";

interface IExpenses {
  month: {
    amount: {
      total: number;
      parts: IPartsInfo[];
    };
  };
}

export interface IFullItem {
  measure: "SMS" | "MINUTES" | "MB";
  balance: number;
  size: number;
  isUnlimited: boolean;
  isLocal: boolean;
  isRoaming: boolean;
  __typename: string;
}

interface IRemainsFull {
  full: IFullItem[];
}

interface IPricePlan {
  id: string;
  name: string;
  description: null | string;
  monthFee: number;
  isArchive: boolean;
  __typename: string;
}

export interface INumberInfo {
  msisdn: string;
  role: string;
  isActive: boolean;
  balance: number;
  payMethodType: string;
  pricePlan: IPricePlan;
  remains: IRemainsFull;
  expenses: IExpenses;
}

export interface IAccountInfo {
  account: {
    msisdn: string;
    email: string;
    birthday: string;
    gender: null | "FEMALE" | "MALE";
    contactPhone: string;
    contactName: string;
    isEmailVerified: boolean;
    number: INumberInfo;
  };
}

export interface IFullDataInfo {
  fullUserInfo: IAccountInfo;
}
