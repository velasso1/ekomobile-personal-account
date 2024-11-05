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
  mark: {
    name: string;
  };
  pricePlan: {
    id: string;
    name: string;
    description: string | null;
    monthFee: number;
    isArchive: boolean;
  };
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
      contactName: string;
      number: {
        groups: IGroupItem[];
        pricePlan: IPricePlan;
      };
    };
  };
}
