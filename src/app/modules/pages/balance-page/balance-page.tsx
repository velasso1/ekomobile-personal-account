import { FC, useState, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { GET_BALANCE_HISTORY } from "../../../api/apollo/queries/get-balance-history";
import { GENERATE_SBP_PAYMENT } from "../../../api/apollo/mutations/generate-sbp-payment";
import {
  GET_RECOMMENDED_PAYMENT,
  IRecommendedPaymentResponse,
} from "../../../api/apollo/queries/get-recommended-payment";

import { IBalancePageResponse, IBalanceReplenishment } from "../../../types/balancepage-response-types";

import { useAppSelector } from "../../../store";

import { PageTitle } from "../../ui/page-title";
import Warning from "../../ui/warning/warning";
import { Card } from "../../ui/card";
import { WarningBadge } from "../../ui";
import Loader from "../../ui/loader/loader";
import HeaderSelect from "../../ui/header-select/header-select";
import ModalBalance from "../../ui/modals/modal-balance";
import TextField from "../../ui/fields/text-field";
import QrCode from "../../ui/qrcode/qrcode";
import ModalServices from "../../ui/modals/modal-services";

import button from "../../../assets/images/button.svg";

import { defaultStyles } from "../../../utils/default-styles";
import { dateFormatter } from "../../../utils/helpers/date-formatter";

interface IPaymentState {
  value: string;
  msisdn: string;
}

const BalancePage: FC = () => {
  const { data, loading, error } = useQuery<IBalancePageResponse>(GET_BALANCE_HISTORY);
  const [generateSBPPayment, { data: paymentData, loading: paymentLoading, error: paymentError }] =
    useMutation<IBalanceReplenishment>(GENERATE_SBP_PAYMENT);

  const {
    data: recomPayData,
    loading: recomLoading,
    error: recomError,
  } = useQuery<IRecommendedPaymentResponse>(GET_RECOMMENDED_PAYMENT);

  const { selectedNumber } = useAppSelector((state) => state.userSlice);

  const [qtyApps, setQty] = useState<number>(4);
  const [paymentState, setPaymentState] = useState<IPaymentState>({
    value: "",
    msisdn: "",
  });
  const [invalidValue, setIvalidValue] = useState<boolean>(false);

  useEffect(() => {
    setPaymentState({ ...paymentState, msisdn: selectedNumber });
  }, [selectedNumber]);

  useEffect(() => {
    if (recomPayData) {
      setPaymentState({
        ...paymentState,
        value: (recomPayData.me.account.number.recommendedPayment.amount / 100).toString(),
      });
    }
  }, [recomPayData]);

  const { textSize, textColor } = defaultStyles;

  const checkValue = (): void => {
    setIvalidValue(false);
    if (+paymentState.value > 0) {
      generateSBPPayment({
        variables: {
          correlationId: crypto.randomUUID(),
          actionId: crypto.randomUUID(),
          paymentId: crypto.randomUUID(),
          targetMsisdn: paymentState.msisdn,
          amount: +paymentState.value * 100,
        },
      });
      return;
    }

    setIvalidValue(true);
  };

  if (loading || paymentLoading) {
    return <Loader />;
  }

  if (error || paymentError) {
    return <WarningBadge isError={true} />;
  }
  return (
    <>
      <ModalServices />
      <ModalBalance />
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
                value={paymentState.value}
                onChangeCb={(e) =>
                  setPaymentState({ ...paymentState, value: e.target.value.replace(/[a-zа-я]/g, "").trim() })
                }
              />
              {invalidValue && <Warning text="Введите коррекктную сумму" />}
              <div className="">
                <button
                  className={`btn btn-link my-[40px] ${textColor.primary} no-underline`}
                  data-modal-toggle="#modal_25"
                >
                  Как сформирован рекомендованный платеж?
                </button>
              </div>
              <div className="hover:cursor-pointer">
                <img src={button} alt="buttonPay" onClick={() => checkValue()} />
              </div>
            </div>

            <div className="take-balance-right w-[40%] xs:hidden xs:text-center md:block md:text-left">
              <div className="">
                <p className={`mb-[20px] ${textSize.default} font-semibold ${textColor.darkBlue}`}>
                  Для оплаты отсканируйте QR-код в мобильном приложении банка или штатной камерой телефона
                </p>
              </div>

              <div className="">
                {paymentData ? (
                  <QrCode url={paymentData.paymentSBPCreate.payment.paymentUrl} />
                ) : (
                  <span>
                    QR code не сформирован. <br /> Чтобы его сформировать, введите сумму и нажмите "Оплатить"
                  </span>
                )}
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
                <th></th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {data.me.account.billingNumber.balanceTopUpList.nodes.map((item, index) => {
                if (index > qtyApps) return;
                return (
                  <tr className="" key={crypto.randomUUID()}>
                    <td>{dateFormatter(item.timestamp).date}</td>
                    <td>{item.methodName}</td>
                    <td>
                      <i className="ki-outline ki-information-2 cursor-pointer" data-modal-toggle="#modal_27"></i>
                    </td>
                    <td>{item.amount / 100}</td>
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
                  return data.me.account.billingNumber.balanceTopUpList.nodes.length;
                })
              }
            >
              Смотреть все
            </a>
          </div>
        </Card>
      </div>
    </>
  );
};

export default BalancePage;
