interface ICategoryItem {
  id: string;
  name: string;
}

interface IFeeItem {
  amount: number;
  type: string;
}

interface IServicesItem {
  category: ICategoryItem;
  id: string;
  serviceId: string;
  name: string;
  description: string;
  state: string;
  isReadonly: boolean;
  enableAt: string;
  fee: IFeeItem;
}

export interface IServicesPageResponse {
  me: {
    account: {
      number: {
        services: IServicesItem[];
      };
    };
  };
}
