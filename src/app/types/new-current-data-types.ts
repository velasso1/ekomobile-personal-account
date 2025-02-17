// types for new current data of selected in header number;

import { INumberInfo } from "./response-full-userinfo-types";
import { IServicesItem } from "./servicespage-response-types";
import { IExpensesInfo } from "./expensespage-response-types";

interface ICurrentNumber extends INumberInfo {
  services: IServicesItem[];
}

export interface IRemainsFullItem {
  measure: string;
  balance: number;
  size: number;
  isUnlimited: boolean;
  isLocal: boolean;
  isRoaming: boolean;
}

export interface IRemainsSimpleItem {
  measure: string;
  balance: number;
  size: number;
  isUnlimited: boolean;
}


interface IBillingNumber {
  msisdn: string;
  isActive: boolean;
  balance: number;
  payMethodType: string;
  pricePlan: {
    id: string;
    name: string;
    description: string | null;
    monthFee: number;
    isArchive: boolean;
  };
  remains: {
    full: IRemainsFullItem[];
    simple: IRemainsSimpleItem[];
  };
  recommendedPayment: {
    amount: number;
    balance: number;
  };
  services: IServicesItem[];
  expenses: IExpensesInfo;
}

export interface ICurrentDataResponse {
  me: {
    account: {
      msisdn: string;
      email: string;
      birthday: string;
      gender: null | "FEMALE" | "MALE";
      contactPhone: string;
      contactName: string;
      isEmailVerified: boolean;
      isContactPhoneVerified;
      number: ICurrentNumber;
      billingNumber: IBillingNumber;
    };
  };
}
