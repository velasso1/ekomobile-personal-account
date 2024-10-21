// response for order details;

interface ICorrelationItem {
  correlationId: string;
  actionId: string;
}

interface IDetailsOrder {
  requestId: string;
  correlation: ICorrelationItem;
}

export interface IOrderDetailsResponse {
  data: {
    detailsOrderByEmail: IDetailsOrder;
  };
}

// response for check details status

interface ILastOrderInfo {
  orderTime: string;
  orderTimeout: string;
}

export interface IOrderAvailableMonth {
  year: number;
  month: number;
}

interface IDeatilsFormats {
  id: string;
  name: string;
}

export interface ICheckResponse {
  me: {
    account: {
      number: {
        details: {
          orderAvailableMonths: IOrderAvailableMonth[];
          lastOrderInfo: ILastOrderInfo;
        };
      };
    };
  };
  detailsFormats: IDeatilsFormats[];
}
