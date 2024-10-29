import { FC } from "react";

import { ITableExpensesProps } from "../../../types/table-types";
import { dateFormatter } from "../../../utils/helpers/date-formatter";
import { ExpensesNames } from "../../../utils/auxuliary-data/expenses-names";

const TableExpenses: FC<ITableExpensesProps> = ({ tableItem }) => {
  return (
    <div className="card min-w-full xs:w-[283px] xs:overflow-scroll lg:overflow-auto">
      <div className="card-table">
        <table className="table align-middle text-sm font-medium text-gray-700">
          <thead>
            <tr>
              <th>
                <span className="sort">
                  <span className="sort-label">Дата операции</span>
                  <span className="sort-icon"></span>
                </span>
              </th>
              <th>
                <span className="sort">
                  <span className="sort-label">Сумма</span>
                  <span className="sort-icon"></span>
                </span>
              </th>
              <th>
                <span className="sort desc">
                  <span className="sort-label">Тип операции</span>
                  <span className="sort-icon"></span>
                </span>
              </th>
              <th className="w-[400px]">
                <span className="sort asc">
                  <span className="sort-label">Описание</span>
                  <span className="sort-icon"></span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableItem.length > 0 ? (
              tableItem.map((item) => {
                const newDate = dateFormatter(item.timestamp);
                return (
                  <tr key={crypto.randomUUID()}>
                    <td>{newDate.date}</td>
                    <td>{item.amount / 100} ₽</td>
                    <td>{ExpensesNames[item.type]}</td>
                    <td>{item.name}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Записей пока нет</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableExpenses;
