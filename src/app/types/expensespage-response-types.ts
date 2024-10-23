import { IOrderAvailableMonth } from "./detailspage-response-types";

export interface INodeItem {
  timestamp: string;
  type: string;
  name: string;
  amount: number;
}

interface ITransactionList {
  total: number;
  nodes: INodeItem[];
}

interface IExpensesMonthItem {
  month: {
    month: {
      year: number;
      month: number;
    };
  };
  amount: {
    total: number;
  };
  transactionList: ITransactionList;
}

interface IExpensesInfo {
  availableMonths: IOrderAvailableMonth[];
  month: IExpensesMonthItem;
}

export interface IExpensesResponse {
  me: {
    account: {
      billingNumber: {
        expenses: IExpensesInfo;
      };
    };
  };
}
