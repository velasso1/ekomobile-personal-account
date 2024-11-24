import { FC } from "react";

import { useAppSelector } from "../../../store";

import { ITableServicesModalProps } from "../../../types/servicespage-response-types";

import { defaultStyles } from "../../../utils/default-styles";

import { moneyFormatter } from "../../../utils/helpers/money-formatter";
import { dateFormatter } from "../../../utils/helpers/date-formatter";
import { formatPhoneNumber } from "../../../utils/helpers/phone-formatter";

interface ITableServicesItem {
  tableItem: ITableServicesModalProps;
}

const TableServicesModal: FC<ITableServicesItem> = ({ tableItem }) => {
  const { textSize, textColor } = defaultStyles;

  const { selectedNumber } = useAppSelector((state) => state.userSlice);
  const paymentDate = dateFormatter(tableItem.date);

  return (
    <table className={`table align-middle ${textSize.default} text-sm font-medium ${textColor.grey}`}>
      <tbody>
        <tr>
          <td>Дата и время</td>
          <td>
            {paymentDate.date}, {`${paymentDate.hours}:${paymentDate.minutes}`}
          </td>
        </tr>
        <tr>
          <td>Сумма</td>
          <td>{moneyFormatter(tableItem.sum)}</td>
        </tr>
        <tr>
          <td>Тип</td>
          <td>{tableItem.methodType ? tableItem.methodType : "Платёж"}</td>
        </tr>
        <tr>
          <td>Способ</td>
          <td>{tableItem.paymentMethod}</td>
        </tr>
        <tr>
          <td>Номер</td>
          <td>{formatPhoneNumber(selectedNumber)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableServicesModal;
