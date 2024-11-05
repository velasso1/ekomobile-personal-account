import { FC, useState, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { ORDER_DETAILS } from "../../../api/apollo/mutations/order-deatils";
import { CHECK_DETAILS_FORMAT } from "../../../api/apollo/queries/check-details-format";

import { useAppSelector } from "../../../store";

import { IOrderDetailsResponse, ICheckResponse } from "../../../types/detailspage-response-types";

import TextField from "../../ui/fields/text-field";
import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import Loader from "../../ui/loader/loader";
import { WarningBadge } from "../../ui";
import Warning from "../../ui/warning/warning";

import { defaultStyles } from "../../../utils/default-styles";
import { month } from "../../../utils/auxuliary-data/month";
import { dateFormatter } from "../../../utils/helpers/date-formatter";
import { IReturnFormatDate } from "../../../utils/helpers/date-formatter";

interface IOrderState {
  lastOrder: IReturnFormatDate;
  orderTimeout: IReturnFormatDate;
}

const DetailsPage: FC = () => {
  const [orderDetails, { data, loading, error }] = useMutation<IOrderDetailsResponse>(ORDER_DETAILS);
  const {
    data: checkData,
    loading: checkLoading,
    error: checkError,
    refetch,
  } = useQuery<ICheckResponse>(CHECK_DETAILS_FORMAT);

  const { selectedNumber, userInfo } = useAppSelector((state) => state.userSlice);

  const [fieldsEmpty, setFieldsEmpty] = useState<boolean>(false);
  const [detailsInfo, setDetailsInfo] = useState({
    email: userInfo.email,
    formatId: "0",
    month: "0",
    orderIsBlocked: false,
  });

  const [orderDate, setOrderDate] = useState<IOrderState>({
    lastOrder: {
      date: "",
      fullHours: "",
    },
    orderTimeout: {
      date: "",
      fullHours: "",
    },
  });

  const { textColor } = defaultStyles;

  useEffect(() => {
    if (checkData) {
      setOrderDate({
        lastOrder: dateFormatter(`${checkData.me.account.number.details.lastOrderInfo.orderTime}`),
        orderTimeout: dateFormatter(`${checkData.me.account.number.details.lastOrderInfo.orderTimeout}`),
      });
    }
  }, [checkData]);

  useEffect(() => {
    const timeoutDate = orderDate.orderTimeout.date.split(".").map((item) => Number(item));
    const timeoutOver = new Date() < new Date(timeoutDate[2], timeoutDate[1] - 1, timeoutDate[0]);

    setDetailsInfo({
      ...detailsInfo,
      orderIsBlocked: timeoutOver,
    });
  }, [orderDate.orderTimeout, checkData]);

  const checkFields = (): void => {
    setFieldsEmpty(false);
    for (const key in detailsInfo) {
      if (key === "orderIsBlocked") continue;

      if (detailsInfo[key] === "" || detailsInfo[key] === "0") {
        setFieldsEmpty(true);
        return;
      }
    }

    sendOrderForRequest();
  };

  const sendOrderForRequest = () => {
    orderDetails({
      variables: {
        correlationId: crypto.randomUUID(),
        actionId: crypto.randomUUID(),
        requestId: crypto.randomUUID(),
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        formatId: detailsInfo.formatId,
        email: detailsInfo.email,
        targetMsisdn: selectedNumber,
      },
    });
    refetch();
  };

  if (loading || checkLoading) {
    return <Loader />;
  }

  if (error || checkError) {
    return <WarningBadge isError={true} title="Вы не можете заказать детализацию, так как заказывали её недавно" />;
  }

  return (
    <div className="h-full w-full px-[45px] xs:p-[18px] md:p-[0] md:px-[45px] md:pt-[40px]">
      {data ? "Заявка отправлена" : null}
      <PageTitle title="Детализация" />
      <Card cardTitle="Запрос деталиции">
        <>
          <div className={`details-info pt-[15px] text-[14px] font-medium ${textColor.greyBlue}`}>
            В прошлый раз вы заказывали детализацию: {orderDate.lastOrder.date}
          </div>
          {detailsInfo.orderIsBlocked && (
            <div className={`details-info pt-[15px] text-[14px] font-medium ${textColor.greyBlue}`}>
              Запрос детализации недоступен до: {`${orderDate.orderTimeout.date}, ${orderDate.orderTimeout.fullHours}`}
            </div>
          )}
          <div className={`details-format py-[15px] text-[14px] font-medium ${textColor.greyBlue}`}>
            Отчет отправляется на электронную почту в формате xlsx
          </div>
          {fieldsEmpty && <Warning text="Заполните все поля" />}
          <div className="flex w-[23vw] flex-col">
            <div className="details-select mt-[20px]">
              <label
                className={`form-label mb-[5px] block max-w-32 text-left text-sm font-medium ${textColor.darkGrey} dark:text-white`}
              >
                Период
              </label>
              <select
                className="select"
                value={detailsInfo.month}
                onChange={(e) => setDetailsInfo({ ...detailsInfo, month: e.target.value })}
              >
                <option disabled value="0">
                  Выберите период
                </option>
                {checkData.me.account.number.details.orderAvailableMonths.map((item) => {
                  return (
                    <option key={item.month} value={item.month}>
                      {month[item.month - 1]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="my-[15px]">
              <TextField
                id="detail-mail"
                type="email"
                placeholder="e-mail"
                value={detailsInfo.email ? detailsInfo.email : userInfo.email}
                onChangeCb={(e) => setDetailsInfo({ ...detailsInfo, email: e.target.value.trim() })}
                Label="Почта"
                width=""
                addStyle=""
              />
            </div>
            <div className="details-select mb-[40px]">
              <label
                className={`form-label mb-[5px] block max-w-32 text-left text-sm font-medium ${textColor.darkGrey} dark:text-white`}
              >
                Формат
              </label>
              <select
                className="select"
                value={detailsInfo.formatId}
                onChange={(e) => setDetailsInfo({ ...detailsInfo, formatId: e.target.value })}
              >
                <option disabled value="0">
                  Выберите формат
                </option>
                {checkData.detailsFormats.map((item) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>
            <Button
              disabled={detailsInfo.orderIsBlocked}
              buttonType="default"
              title="Создать заявку на детализацию расходов"
              onClickCb={() => checkFields()}
            />
          </div>
        </>
      </Card>
    </div>
  );
};

export default DetailsPage;
