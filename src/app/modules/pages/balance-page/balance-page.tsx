import { FC, useState } from "react";

import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";
import HeaderSelect from "../../ui/header-select/header-select";
import ModalBalance from "../../ui/modals/modal-balance";
import TextField from "../../ui/fields/text-field";

import button from "../../../assets/images/button.svg";
import qr from "../../../assets/images/qr-code.svg";

import { defaultStyles } from "../../../utils/default-styles";

import config from "../../../../../auxuliary.json";

interface IBalanceItem {
  id: string;
  date: string;
  method: string;
  sum: string;
}

const BalancePage: FC = () => {
  const [qtyApps, setQty] = useState<number>(4);
  const [value, setValue] = useState<string>("");

  const { textSize, textColor } = defaultStyles;

  return (
    <>
      <div className="h-full px-[45px] xs:mx-[18px] xs:p-[0] md:mx-[auto] md:px-[45px] md:pt-[40px]">
        <PageTitle title="Пополнение баланса" />
        <Card>
          <div className="take-balance flex justify-between xs:flex-col md:flex-row">
            <div className="take-balance-left w-full xs:flex xs:flex-col xs:items-center md:block">
              <HeaderSelect
                label="Телефон"
                addStyle="flex flex-col mb-[20px]"
                selectStyle="border-1 h-[40px] w-[290px]"
              />
              <TextField
                id="balance-sum"
                type="text"
                Label="Сумма платежа"
                placeholder="введите сумму"
                value={value}
                onChangeCb={(e) => setValue(e.target.value.trim())}
              />
              <div className="">
                <button
                  className={`btn btn-link my-[40px] ${textColor.primary} no-underline`}
                  data-modal-toggle="#modal_5"
                >
                  Как сформирован рекомендованный платеж?
                </button>
              </div>
              <div className="hover:cursor-pointer">
                <img src={button} alt="buttonPay" />
              </div>
            </div>

            <div className="take-balance-right w-[40%] xs:hidden xs:text-center md:block md:text-left">
              <div className="">
                <p className={`mb-[20px] ${textSize.default} font-semibold ${textColor.darkBlue}`}>
                  Для оплаты отсканируйте QR-код в мобильном приложении банка или штатной камерой телефона
                </p>
              </div>

              <div className="">
                <img className="w-[150px]" src={qr} alt="qr-code" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <table className="table align-middle text-sm font-medium text-gray-700">
            <thead>
              <tr>
                <th>Дата операции</th>
                <th>Способ оплаты</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {config.balance.map((item: IBalanceItem, index) => {
                if (index > qtyApps) return;
                return (
                  <tr className="" key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.method}</td>
                    <td>{item.sum}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="w-full border-t-2 py-[10px] text-center">
            <a
              className={`btn btn-link ${textColor.primary}`}
              onClick={() =>
                setQty(() => {
                  return qtyApps + (config.applicTable.length - qtyApps);
                })
              }
            >
              Смотреть все
            </a>
          </div>
        </Card>
      </div>
      <ModalBalance />
    </>
  );
};

export default BalancePage;
