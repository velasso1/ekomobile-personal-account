export interface IPricePlan {
  id: string;
  name: string;
  description: null | string;
  monthFee: number;
  isArchive: boolean;
}

export interface INumbersItem {
  msisdn: string;
  isActive: boolean;
  balance: string;
  payMethodType: string;
  description: null | string;
  access: ["ALL"];
  hasFullAccess: boolean;
}

export interface IGroupItem {
  id: string;
  balance: number;
  defaultName: string;
  isBalancerEnabled: boolean;
  numbers: INumbersItem[];
}

export interface INumbersResponse {
  me: {
    account: {
      number: {
        groups: IGroupItem[];
        pricePlan: IPricePlan;
      };
    };
  };
}
