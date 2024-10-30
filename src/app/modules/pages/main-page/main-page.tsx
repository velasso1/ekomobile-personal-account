import { FC, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { CHECK_VERIFICATION } from "../../../api/apollo/queries/check-verification";

import { useAppDispatch, useAppSelector } from "../../../store";
import { setChecking } from "../../../store/slices/auth-slice";

import { IVerificationData } from "../../../types/mainpage-userinfo-types";

import Loader from "../../ui/loader/loader";
import { WarningBadge } from "../../ui";
import { CircleProgressBar } from "../../ui/circle-progress-bar";
import { Button } from "../../ui/button";

import { defaultStyles } from "../../../utils/default-styles";
import { mainRoutes } from "../../../utils/routes-name/main-routes";
import { formatPhoneNumber } from "../../../utils/helpers/phone-formatter";
import { ExpensesNames, CircleProgressName } from "../../../utils/auxuliary-data/expenses-names";
import { getProgressColor } from "../../../utils/auxuliary-data/progress-color";
import { moneyFormatter } from "../../../utils/helpers/money-formatter";

const MainPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data: verificData,
    loading: verificLoading,
    error: verificError,
  } = useQuery<IVerificationData>(CHECK_VERIFICATION);

  const { newCurrentData } = useAppSelector((state) => state.userSlice);

  const [visibleTab, setVisibleTab] = useState<boolean>(true);
  const { bgColor, textSize, textColor } = defaultStyles;

  useEffect(() => {
    dispatch(setChecking(false));
  }, []);

  if (verificLoading || !newCurrentData) {
    return <Loader />;
  }

  if (verificError) {
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
          <p className="font-semibold xs:text-[15px] md:text-[22px]">{newCurrentData.me.account.contactName}</p>
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
            {formatPhoneNumber(newCurrentData.me.account.billingNumber.msisdn)}
          </div>
          <div className="ml-[15px]">
            <span
              className={`badge badge-outline ${newCurrentData.me.account.billingNumber.isActive ? "badge-success" : null}`}
            >
              {newCurrentData.me.account.billingNumber.isActive ? "Активен" : "Заблокирован"}
            </span>
          </div>
        </div>

        <div className="card-body pt-[30px]">
          <p className={`mb-[5px] ${textSize.default} ${textColor.grey}`}>Мой тариф</p>
          <p className={`tarif mb-[5px] text-[16px] font-semibold ${textColor.darkBlue}`}>
            {newCurrentData.me.account.billingNumber.pricePlan.name}
          </p>
          {/* <a className={`btn-link ${textColor.primary}`} href="#">
            Подробнее
          </a> */}
        </div>

        <div className="card-body px-[0] xs:justify-self-end xs:pr-[40px] md:justify-self-start">
          <p className={`mb-[5px] ${textSize.default} ${textColor.grey}`}>Мой баланс</p>
          <p className={`mb-[5px] font-semibold ${textColor.darkBlue} xs:text-[20px] md:text-[30px]`}>
            {moneyFormatter(newCurrentData.me.account.billingNumber.balance)} ₽
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
            {newCurrentData.me.account.billingNumber.remains.full.map((item, index) => {
              const getCircleColor = ["primary", "lightBlue", "lightGrey"];

              return (
                <CircleProgressBar
                  key={crypto.randomUUID()}
                  color={textColor[`${getCircleColor[index]}`]}
                  nameOfValue={CircleProgressName[item.measure.slice(0, 3)]}
                  initialValue={item.measure === "MB" ? Math.floor(item.size / 1024) : item.size}
                  remainderValue={item.measure === "MB" ? Math.floor(item.balance / 1024) : item.balance}
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
              {moneyFormatter(newCurrentData.me.account.number.expenses.month.amount.total)} ₽
            </div>
            <div className="progress py-[5px]">
              {newCurrentData.me.account.number.expenses.month.amount.parts.map((item, index) => {
                return (
                  <div
                    key={crypto.randomUUID()}
                    className={`${bgColor[`${getProgressColor[index]}`]} progress-bar rounded-[3px] py-[5px]`}
                    style={{
                      width: `${(item.amount * 100) / newCurrentData.me.account.number.expenses.month.amount.total}%`,
                    }}
                  ></div>
                );
              })}
            </div>

            <div className="explanation mt-[20px] flex xs:flex-col">
              {newCurrentData.me.account.number.expenses.month.amount.parts.map((item, index) => {
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
                    <span>{moneyFormatter(item.amount)}₽</span>
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
                    {newCurrentData.me.account.number.services.map((item) => {
                      if (item.fee && item.fee.amount === 0) {
                        return <Button key={item.id} buttonType="services" title={item.name} />;
                      }
                    })}
                  </div>
                ) : (
                  <div className="" id="tab_1_2">
                    {newCurrentData.me.account.number.services.map((item) => {
                      if (item.fee && item.fee.amount > 0) {
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
