import { FC, useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { GET_FULL_DATA } from "../../../api/apollo/queries/get-full-data";

import { useNavigate } from "react-router-dom";

import Loader from "../../ui/loader/loader";
import { WarningBadge } from "../../ui";
import { CircleProgressBar } from "../../ui/circle-progress-bar";
import { Button } from "../../ui/button";

import { defaultStyles } from "../../../utils/default-styles";
import { mainRoutes } from "../../../utils/routes-name/main-routes";

import config from "../../../../../auxuliary.json";

const MainPage: FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_FULL_DATA, { variables: { year: 2024, month: 9 } });

  const [userInfo, setUserInfo] = useState({
    contactName: "",
    contactPhone: "",
    planName: "",
    balance: "",
    numberIsActive: false,
    remainders: [
      {
        type: "",
        size: 0,
        total: 0,
        isUnlimited: false,
      },
      {
        type: "",
        size: 0,
        total: 0,
        isUnlimited: false,
      },
      {
        type: "",
        size: 0,
        total: 0,
        isUnlimited: false,
      },
    ],
    expenses: {
      total: 0,
      parts: [],
    },
  });

  useEffect(() => {
    if (data) {
      const { contactName, msisdn, number, expenses } = data.fullUserInfo.account;
      console.log(data);

      setUserInfo({
        ...userInfo,
        contactName: contactName,
        contactPhone: msisdn,
        planName: number.pricePlan.name,
        balance: number.balance,
        numberIsActive: number.isActive,
        remainders: [
          {
            type: number.remains.full[0].measure,
            size: number.remains.full[0].size,
            total: number.remains.full[0].balance,
            isUnlimited: number.remains.full[0].isUnlimited,
          },
          {
            type: number.remains.full[1].measure,
            size: number.remains.full[1].size,
            total: number.remains.full[1].balance,
            isUnlimited: number.remains.full[1].isUnlimited,
          },
          {
            type: number.remains.full[2].measure,
            size: number.remains.full[2].size,
            total: number.remains.full[2].balance,
            isUnlimited: number.remains.full[2].isUnlimited,
          },
        ],
        expenses: {
          total: number.expenses.month.amount.total,
          parts: number.expenses.month.amount.parts,
        },
      });
    }
  }, [data]);

  const [visibleTab, setVisibleTab] = useState<boolean>(true);
  const { bgColor, textSize, textColor } = defaultStyles;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="main-page mb-[40px] pt-[8px]">
      <WarningBadge
        title="Требуется подтверждение"
        message="Требуется подтверждение номера на Госуслугах."
        buttonText="Подтвердить"
      />

      <div className="card grid grid-cols-2 flex-row xs:mx-[20px] xs:mb-[20px] md:mx-[45px] md:mb-[40px]">
        <div className="card-body">
          <p className="font-semibold xs:text-[15px] md:text-[22px]">{userInfo.contactName}</p>
          <a
            className={`btn-link ${textSize.default} ${textColor.primary}`}
            href="#"
            onClick={() => navigate(mainRoutes.profile)}
          >
            Профиль
          </a>
        </div>
        <div className="card-body my-[20px] flex border-b-2 border-[#EAECEE] pt-[5px] xs:mr-[10px] xs:flex-col md:mr-[40px] md:flex-row">
          <div className={`font-semibold ${textColor.darkBlue} xs:${textSize.default} md:text-[18px]`}>
            +7{userInfo.contactPhone}
          </div>
          <div className="ml-[15px]">
            <span className={`badge badge-outline ${userInfo.numberIsActive ? "badge-success" : null}`}>
              {userInfo.numberIsActive ? "Активен" : "Заблокирован"}
            </span>
          </div>
        </div>

        <div className="card-body pt-[30px]">
          <p className={`mb-[5px] ${textSize.default} ${textColor.grey}`}>Мой тариф</p>
          <p className={`tarif mb-[5px] text-[16px] font-semibold ${textColor.darkBlue}`}>{userInfo.planName}</p>
          <a className={`btn-link ${textColor.primary}`} href="#">
            Подробнее
          </a>
        </div>

        <div className="card-body px-[0] xs:justify-self-end xs:pr-[40px] md:justify-self-start">
          <p className={`mb-[5px] ${textSize.default} ${textColor.grey}`}>Мой баланс</p>
          <p className={`mb-[5px] font-semibold ${textColor.darkBlue} xs:text-[20px] md:text-[30px]`}>
            {userInfo.balance} ₽
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
            {userInfo.remainders.map((item, index) => {
              const getCircleColor = ["primary", "lightBlue", "lightGrey"];

              return (
                <CircleProgressBar
                  // добавил индекс, еслим будет изменение позиций, добавление или удаление,нужен будет статичный уникальный ключ
                  key={"circle-progress-"+ index}
                  color={textColor[`${getCircleColor[index]}`]}
                  nameOfValue={item.type.slice(0, 3)}
                  initialValue={item.size}
                  remainderValue={item.total}
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
            <div className="sum mb-[10px] text-[30px] font-semibold">{userInfo.expenses.total} ₽</div>
            <div className="progress py-[5px]">
             {/* TODO: add types! */}
              {userInfo.expenses.parts.map((item) => {
                return (
                  <div
                    key={item.type +"progress"}
                    className={`${bgColor.primary} progress-bar rounded-[3px] py-[5px]`}
                    style={{ width: `${(item.amount * 100) / userInfo.expenses.total}%` }}
                  ></div>
                );
              })}
            </div>

            <div className="explanation mt-[20px] flex xs:flex-col">
              {userInfo.expenses.parts.map((item) => {
                return (
                  <div
                    key={item.type +"info"}                   
                    className={`information flex items-center ${textSize.default} font-medium md:mr-[15px]`}>
                    <span className={`${bgColor.primary} badge badge-dot size-2.5 md:mr-[5px]`}></span>
                    <span className="md:mr-[5px]">{item.type}</span>
                    <span>{item.amount}₽</span>
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
                    {config.buttons.map((item) => {
                      return <Button key={item.id} buttonType="services" title={item.name} />;
                    })}
                  </div>
                ) : (
                  <div className="" id="tab_1_2">
                    Пока что здесь нет тарифов
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
