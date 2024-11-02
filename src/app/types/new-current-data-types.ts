// types for new current data of selected in header number;

import { INumberInfo } from "./response-full-userinfo-types";
import { IServicesItem } from "./servicespage-response-types";

interface ICurrentNumber extends INumberInfo {
  services: IServicesItem[];
}

interface IRemainsFullItem {
  measure: string;
  balance: number;
  size: number;
  isUnlimited: boolean;
  isLocal: boolean;
  isRoaming: boolean;
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
  };
  recommendedPayment: {
    amount: number;
    balance: number;
  };
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
