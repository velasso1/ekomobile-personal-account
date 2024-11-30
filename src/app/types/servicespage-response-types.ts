interface ICategoryItem {
  id: string;
  name: string;
}

interface IFeeItem {
  amount: number;
  type: string;
}

export interface IServicesItem {
  category: ICategoryItem;
  id: string;
  serviceId: string;
  name: string;
  description: string;
  state: string;
  isReadonly: boolean;
  enabledAt: string;
  fee: IFeeItem;
}

export interface IServicesPageResponse {
  me: {
    account: {
      billingNumber: {
        services: IServicesItem[];
      };
    };
  };
}

// available services types

export interface IAvailableServiceItem {
  serviceId: string;
  name: string;
  description: string;
  feeToEnable: number;
  category: {
    id: string;
    name: string;
  };
  fee: {
    amount: number;
    type: string;
  };
}

export interface IAvailableServicesResponse {
  me: {
    account: {
      billingNumber: {
        services: IAvailableServiceItem[];
      };
    };
  };
}

// Types for services modal

export interface ITableServicesModalProps {
  date: string;
  sum: number;
  paymentMethod: string;
  number?: string;
  methodType?: string;
}
