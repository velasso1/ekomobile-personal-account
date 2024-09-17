export interface IItemTableNumbersProps {
  number: string;
  tarif: string;
  balance: string | number;
  status: boolean;
  fullAccess: boolean;
  description: string;
}

export interface ITableNumbersProps {
  tableName: string;
  tableItem: IItemTableNumbersProps[];
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

export interface ITableExpensesItem {
  date: string;
  sum: string;
  operationType: string;
  description: string;
}

export interface ITableExpensesProps {
  tableItem: ITableExpensesItem[];
}
