import { INumbersItem } from "./numbers-response-types";
import { IPricePlan } from "./numbers-response-types";
import { INodeItem } from "./expensespage-response-types";
import { IGroupNumber } from "./gu-types";

export interface IItemTableNumbersProps {
  id?: string;
  balance: number;
  defaultName?: string;
  isBalancerEnabled?: boolean;
  numbers?: INumbersItem[];
  msisdn?: string;
  isActive?: boolean;
  // id: string;
  // msisdn: number;
  // tarif: string;
  // balance: number;
  // hasFullAccess: boolean;
  // description: string;
}

export interface ITableNumbersProps {
  tableName: string;
  tableItem: IItemTableNumbersProps;
  pricePlan: IPricePlan;
}

///////////////////////////////////////

export interface IItemServiceTable {
  name: string;
  description: string;
  date: string;
  price: string;
  typePrice: string;
  actions: boolean;
}

export interface IServiceTableProps {
  tableName?: string;
  tableItem: IItemServiceTable[];
}

///////////////////////////////////////

export interface ITableExpensesProps {
  tableItem: INodeItem[];
}

///////////////////////////////////////

export interface ITableGosuslugiProps {
  tableName: string;
  tableItem: IGroupNumber[];
}

///////////////////////////////////////
