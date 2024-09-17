import { FC } from 'react';

import { ITableNumbersProps } from '../../../types/table-types';

const TableNumbers: FC<ITableNumbersProps> = ({ tableName, tableItem }) => {
  const fullBalance = tableItem.reduce((acc, item) => {
    console.log(acc);

    return acc + +item.balance;
  }, 0);

  return (
    <div className="card mr-[45px] mt-[35px]">
      <div className="card-header">
        <h3 className="card-title">{tableName}</h3>
      </div>
      <div className="card-table pb-[20px]">
        <table className="table flex align-middle text-sm font-medium text-gray-700">
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
            {tableItem.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.number}</td>
                  <td>{item.tarif}</td>
                  <td className={`${+item.balance < 0 ? 'text-[red]' : null}`}>
                    {item.balance} ₽
                  </td>
                  <td>
                    {item.status ? (
                      <span className="badge badge-outline badge-success">
                        Активен
                      </span>
                    ) : (
                      <span className="badge badge-outline">Заблокирован</span>
                    )}
                  </td>
                  <td>
                    {item.fullAccess ? (
                      <span className="badge badge-outline badge-success">
                        Есть
                      </span>
                    ) : (
                      <span className="badge badge-outline badge-danger">
                        Нет
                      </span>
                    )}
                  </td>
                  <td>
                    <a className="btn btn-link text-[#005DA6]" href="#">
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
      <p className="mb-[10px] pl-[30px] text-[12px] font-medium">
        Баланс группы:{' '}
        <span className="text-[12px] font-medium text-[#78829D]">{`${fullBalance}`}</span>
      </p>
    </div>
  );
};

export default TableNumbers;
