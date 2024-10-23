import { FC, useState } from "react";

import { useQuery } from "@apollo/client";
import { GET_FULL_DATA } from "../../../api/apollo/queries/get-full-data";
import { CHECK_VERIFICATION } from "../../../api/apollo/queries/check-verification";
import { GET_SERVICES } from "../../../api/apollo/queries/get-services";

import { useNavigate } from "react-router-dom";

import { IVerificationData } from "../../../types/mainpage-userinfo-types";
import { IFullDataInfo } from "../../../types/response-full-userinfo-types";
import { IServicesPageResponse } from "../../../types/servicespage-response-types";

import Loader from "../../ui/loader/loader";
import { WarningBadge } from "../../ui";
import { CircleProgressBar } from "../../ui/circle-progress-bar";
import { Button } from "../../ui/button";

import { defaultStyles } from "../../../utils/default-styles";
import { mainRoutes } from "../../../utils/routes-name/main-routes";
import { formatPhoneNumber } from "../../../utils/helpers/phone-formatter";
import { ExpensesNames, CircleProgressName } from "../../../utils/auxuliary-data/expenses-names";
import { getProgressColor } from "../../../utils/auxuliary-data/progress-color";

// import config from "../../../../../auxuliary.json";

const MainPage: FC = () => {
  const navigate = useNavigate();

  const date = new Date();

  const { data, loading, error } = useQuery<IFullDataInfo>(GET_FULL_DATA, {
    variables: { year: date.getFullYear(), month: date.getMonth() + 1 },
  });
  const {
    data: verificData,
    loading: verificLoading,
    error: verificError,
  } = useQuery<IVerificationData>(CHECK_VERIFICATION);

  const {
    data: servicesData,
    loading: servicesLoading,
    error: servicesError,
  } = useQuery<IServicesPageResponse>(GET_SERVICES);

  const [visibleTab, setVisibleTab] = useState<boolean>(true);
  const { bgColor, textSize, textColor } = defaultStyles;
  const formattedPhone = data ? formatPhoneNumber(data.fullUserInfo.account.contactPhone) : "";

  if (loading || servicesLoading || verificLoading) {
    return <Loader />;
  }

  if (error || servicesError || verificError) {
    console.log(error);

    return <WarningBadge isError={true} />;
  }

  return (
    <div className="main-page mb-[40px] pt-[8px]">
      {verificData && !verificData.me.account.isContactPhoneVerified && (
        <WarningBadge
          title="Требуется подтверждение"
          message="Требуется подтверждение номера на Госуслугах."
          buttonText="Подтвердить"
        />
      )}

      <div className="card grid grid-cols-2 flex-row xs:mx-[20px] xs:mb-[20px] md:mx-[45px] md:mb-[40px]">
        <div className="card-body">
          <p className="font-semibold xs:text-[15px] md:text-[22px]">{data.fullUserInfo.account.contactName}</p>
          <a
            className={`btn-link ${textSize.default} ${textColor.primary}`}
            href="#"
            onClick={() => navigate(mainRoutes.profile)}
          >
            Профиль
          </a>
        </div>
        <div className="card-body my-[20px] flex border-b-2 border-[#EAECEE] pl-[0px] pt-[5px] xs:mr-[10px] xs:flex-col xs:text-[13px] md:mr-[40px] md:flex-row md:text-[15px]">
          <div className={`font-semibold ${textColor.darkBlue} xs:${textSize.default} md:text-[18px]`}>
            {formattedPhone}
          </div>
          <div className="ml-[15px]">
            <span
              className={`badge badge-outline ${data.fullUserInfo.account.number.isActive ? "badge-success" : null}`}
            >
              {data.fullUserInfo.account.number.isActive ? "Активен" : "Заблокирован"}
            </span>
          </div>
        </div>

        <div className="card-body pt-[30px]">
          <p className={`mb-[5px] ${textSize.default} ${textColor.grey}`}>Мой тариф</p>
          <p className={`tarif mb-[5px] text-[16px] font-semibold ${textColor.darkBlue}`}>
            {data.fullUserInfo.account.number.pricePlan.name}
          </p>
          {/* <a className={`btn-link ${textColor.primary}`} href="#">
            Подробнее
          </a> */}
        </div>

        <div className="card-body px-[0] xs:justify-self-end xs:pr-[40px] md:justify-self-start">
          <p className={`mb-[5px] ${textSize.default} ${textColor.grey}`}>Мой баланс</p>
          <p className={`mb-[5px] font-semibold ${textColor.darkBlue} xs:text-[20px] md:text-[30px]`}>
            {data.fullUserInfo.account.number.balance / 100} ₽
          </p>
          <Button buttonType="default" title="Пополнить" onClickCb={() => navigate(mainRoutes.balance)} />
        </div>
      </div>

      <div className="grid grid-cols-2 xs:mx-[20px] xs:gap-5 md:mx-[0] md:gap-10 md:px-[45px]">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Остатки по пакетам</h3>
          </div>
          <div className="card-body flex flex-row justify-between xs:flex-col xs:items-center md:flex-row">
            {data.fullUserInfo.account.number.remains.full.map((item, index) => {
              const getCircleColor = ["primary", "lightBlue", "lightGrey"];

              return (
                <CircleProgressBar
                  key={crypto.randomUUID()}
                  color={textColor[`${getCircleColor[index]}`]}
                  nameOfValue={CircleProgressName[item.measure.slice(0, 3)]}
                  initialValue={item.measure === "MB" ? item.size / 1024 : item.size}
                  remainderValue={item.measure === "MB" ? item.balance / 1024 : item.balance}
                  valueInfinity={item.isUnlimited}
                />
              );
            })}
          </div>
          <div className="card-footer justify-center">
            <a
              className={`${textColor.primary} btn-link hover:cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();
                navigate(mainRoutes.remainder);
              }}
            >
              Подробнее
            </a>
          </div>
        </div>

        <div className="card xs:mb-[10px]">
          <div className="card-header">
            <h3 className="card-title">Расходы текущего периода</h3>
          </div>
          <div className="card-body">
            <div className="sum mb-[10px] text-[30px] font-semibold">
              {data.fullUserInfo.account.number.expenses.month.amount.total / 100} ₽
            </div>
            <div className="progress py-[5px]">
              {data.fullUserInfo.account.number.expenses.month.amount.parts.map((item, index) => {
                return (
                  <div
                    key={crypto.randomUUID()}
                    className={`${bgColor[`${getProgressColor[index]}`]} progress-bar rounded-[3px] py-[5px]`}
                    style={{
                      width: `${(item.amount * 100) / data.fullUserInfo.account.number.expenses.month.amount.total}%`,
                    }}
                  ></div>
                );
              })}
            </div>

            <div className="explanation mt-[20px] flex xs:flex-col">
              {data.fullUserInfo.account.number.expenses.month.amount.parts.map((item, index) => {
                if (item.amount <= 0) {
                  return;
                }
                return (
                  <div
                    key={crypto.randomUUID()}
                    className={`information flex items-center ${textSize.default} font-medium md:mr-[15px]`}
                  >
                    <span
                      className={`${bgColor[`${getProgressColor[index]}`]} badge badge-dot size-2.5 md:mr-[5px]`}
                    ></span>
                    <span className="md:mr-[5px]">{ExpensesNames[item.type]}</span>
                    <span>{item.amount / 100}₽</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card-footer justify-center">
            <a
              className={`${textColor.primary} btn-link hover:cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();
                navigate(mainRoutes.expenses);
              }}
            >
              Посмотреть все
            </a>
          </div>
        </div>

        <div className="xs:w-[90vw] md:w-[auto]">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Мои услуги</h3>
            </div>
            <div className="card-body">
              <div>
                <div className="tabs mb-5" data-tabs="true ">
                  <button
                    className={`${visibleTab ? "active" : null} tab text-[14px] ${textColor.greyBlue}`}
                    data-tab-toggle="#tab_1_1"
                    onClick={() => setVisibleTab(true)}
                  >
                    Без абонентской платы
                  </button>
                  <button
                    className={`${!visibleTab ? "active" : null} tab text-[14px] ${textColor.greyBlue}`}
                    data-tab-toggle="#tab_1_2"
                    onClick={() => setVisibleTab(false)}
                  >
                    С абонентской платой
                  </button>
                </div>
                {visibleTab ? (
                  <div className="" id="tab_1_1">
                    {servicesData.me.account.number.services.map((item) => {
                      if (item.fee && item.fee.amount > 0) {
                        return <Button key={item.id} buttonType="services" title={item.name} />;
                      }
                    })}
                  </div>
                ) : (
                  <div className="" id="tab_1_2">
                    {servicesData.me.account.number.services.map((item) => {
                      if (item.fee && item.fee.amount === 0) {
                        return <Button key={item.id} buttonType="services" title={item.name} />;
                      }
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="card-footer justify-center">
              <a
                className={`${textColor.primary} btn-link hover:cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(mainRoutes.services);
                }}
              >
                Посмотреть все
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
