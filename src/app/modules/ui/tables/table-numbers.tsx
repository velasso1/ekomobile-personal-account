import { FC } from "react";

import { ITableNumbersProps } from "../../../types/table-types";

import { defaultStyles } from "../../../utils/default-styles";

const TableNumbers: FC<ITableNumbersProps> = ({ tableName, tableItem }) => {
  const fullBalance = tableItem.reduce((acc, item) => {
    return acc + +item.balance;
  }, 0);

  const { textSize, textColor } = defaultStyles;

  return (
    <div className="card mr-[45px] xs:w-[283px] xs:overflow-scroll md:w-auto lg:overflow-auto">
      <div className="card-header">
        <h3 className="card-title">{tableName}</h3>
      </div>
      <div className="card-table pb-[20px]">
        <table className="table flex align-middle font-medium text-gray-700 sm:text-[10px] md:text-sm">
          <thead>
            <tr className="">
              <th className="w-[200px]">Номер</th>
              <th className="w-[350px]">Тариф</th>
              <th className="w-[180px]">Баланс</th>
              <th className="w-[200px]">Статус</th>
              <th className="">Полный доступ в ЛК</th>
              <th className="">Описание</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {tableItem.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.number}</td>
                  <td>{item.tarif}</td>
                  <td className={`${+item.balance < 0 ? "text-[red]" : null}`}>{item.balance} ₽</td>
                  <td>
                    {item.status ? (
                      <span className="badge badge-outline badge-success">Активен</span>
                    ) : (
                      <span className="badge badge-outline">Заблокирован</span>
                    )}
                  </td>
                  <td>
                    {item.fullAccess ? (
                      <span className="badge badge-outline badge-success">Есть</span>
                    ) : (
                      <span className="badge badge-outline badge-danger">Нет</span>
                    )}
                  </td>
                  <td>
                    <a className={`btn-link ${textColor.primary}`} href="#">
                      {item.description}
                    </a>
                  </td>
                  <td>
                    <i className="ki-outline ki-notepad-edit text-[16px] text-[#1B84FF]"></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="border-b border-b-gray-200"></div>
      </div>
      <p className={`mb-[10px] pl-[30px] ${textSize.default} font-medium`}>
        Баланс группы:
        <span className={`ml-[5px] ${textSize.default} font-medium ${textColor.grey}`}>{`${fullBalance}`}</span>
      </p>
    </div>
  );
};

export default TableNumbers;
