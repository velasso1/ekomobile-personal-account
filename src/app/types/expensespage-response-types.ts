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
      number: {
        expenses: IExpensesInfo;
      };
    };
  };
}
