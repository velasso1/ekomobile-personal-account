import { FC } from "react";
import { ITableExpensesProps } from "../../../types/table-types";

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
              <th>
                <span className="sort asc">
                  <span className="sort-label">Описание</span>
                  <span className="sort-icon"></span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableItem.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.sum} ₽</td>
                  <td>{item.operationType}</td>

                  <td>{item.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableExpenses;
