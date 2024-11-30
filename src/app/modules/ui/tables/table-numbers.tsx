import { FC, useState } from "react";

import { ITableNumbersProps } from "../../../types/table-types";

import ChangeMarkPopUp from "../popup/change-mark-popup";

import { formatPhoneNumber } from "../../../utils/helpers/phone-formatter";
import { defaultStyles } from "../../../utils/default-styles";
import { moneyFormatter } from "../../../utils/helpers/money-formatter";

export interface IPopupState {
  showPopup: boolean;
  tragetMsisdn: number;
}

const TableNumbers: FC<ITableNumbersProps> = ({ tableName, tableItem, pricePlan }) => {
  const [popupData, setPopupData] = useState<IPopupState>({ showPopup: false, tragetMsisdn: 0 });

  const { textSize, textColor } = defaultStyles;

  return (
    <>
      {popupData.showPopup && <ChangeMarkPopUp popupData={popupData} setPopupData={setPopupData} />}
      <div
        className={`${popupData.showPopup && "pointer-events-none opacity-20"} card mr-[45px] xs:w-[283px] xs:overflow-scroll md:w-auto lg:overflow-auto`}
      >
        <div className="card-header">
          <h3 className="card-title">{tableName}</h3>
        </div>
        <div className="card-table pb-[20px]">
          <table className="table flex align-middle font-medium text-gray-700 sm:text-[10px] md:text-sm">
            <thead>
              <tr className="">
                <th className="w-[300px]">Номер</th>
                <th className="w-[200px]">Тариф</th>
                <th className="w-[180px]">Баланс</th>
                <th className="w-[200px]">Статус</th>
                <th className="">Полный доступ в ЛК</th>
                <th className="">Описание</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {tableItem?.numbers ? (
                tableItem.numbers.map((item) => {
                  return (
                    <tr key={item.msisdn}>
                      <td>{formatPhoneNumber(item.msisdn)}</td>
                      <td>{item.pricePlan.name}</td>
                      <td className={`${+item.balance < 0 ? "text-[red]" : null}`}>
                        {moneyFormatter(+item.balance)} ₽
                      </td>
                      <td>
                        <span className={`badge badge-outline badge-${item.isActive ? "success" : "danger"}`}>
                          {item.isActive ? "Активен" : "Заблокирован"}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-outline badge-${item.hasFullAccess ? "success" : "danger"}`}>
                          {item.hasFullAccess ? "Да" : "Нет"}
                        </span>
                      </td>
                      <td>
                        {item?.mark?.name ? (
                          <a className={`btn-link ${textColor.primary}`} href="#">
                            {item.mark.name}
                          </a>
                        ) : (
                          "Отсутствует"
                        )}
                      </td>
                      <td>
                        <i
                          className="ki-outline ki-notepad-edit cursor-pointer text-[16px] text-[#1B84FF]"
                          onClick={() => setPopupData({ tragetMsisdn: +item.msisdn, showPopup: true })}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>{formatPhoneNumber(tableItem.msisdn)}</td>
                  <td>{pricePlan.name}</td>
                  <td>{moneyFormatter(tableItem.balance)}</td>
                  <td>
                    <span className={`badge badge-outline badge-${tableItem.isActive ? "success" : "danger"}`}>
                      {tableItem.isActive ? "Активен" : "Заблокирован"}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-outline badge-success">Да</span>
                  </td>
                  <td>Отсутствует</td>
                  <td>
                    <i className="ki-outline ki-notepad-edit text-[16px] text-[#1B84FF]"></i>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="border-b border-b-gray-200"></div>
        </div>
        <p className={`mb-[10px] pl-[30px] ${textSize.default} font-medium`}>
          Баланс группы:
          <span className={`ml-[5px] ${textSize.default} font-medium ${textColor.grey}`}>
            {moneyFormatter(tableItem.balance)}
          </span>
        </p>
      </div>
    </>
  );
};

export default TableNumbers;
