import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { WarningBadge } from "../../ui";
import { CircleProgressBar } from "../../ui/circle-progress-bar";
import { Button } from "../../ui/button";

import { defaultStyles } from "../../../utils/default-styles";
import { mainRoutes } from "../../../utils/routes-name/main-routes";

import config from "../../../../../auxuliary.json";

type ExpensesCalc = {
  communications: number;
  services: number;
  other: number;
};

const MainPage: FC = () => {
  const [visibleTab, setVisibleTab] = useState<boolean>(true);
  const { bgColor, textSize, textColor } = defaultStyles;

  // temp example
  const [expenses, setExpenses] = useState<ExpensesCalc>({
    communications: 752,
    services: 215,
    other: 300,
  });
  const [phoneStatus, setPhoneStatus] = useState<boolean>(true);

  const sum = expenses.communications + expenses.services + expenses.other;
  const perOne = expenses.communications / sum;
  const perTwo = expenses.services / sum;
  const perThree = expenses.other / sum;
  // temp example

  const navigate = useNavigate();
  return (
    <div className="main-page mb-[40px] pt-[8px]">
      <WarningBadge
        title="Требуется подтверждение"
        message="Требуется подтверждение номера на Госуслугах."
        buttonText="Подтвердить"
      />

      <div className="card grid grid-cols-2 flex-row xs:mx-[20px] xs:mb-[20px] md:mx-[45px] md:mb-[40px]">
        <div className="card-body">
          <p className="font-semibold xs:text-[15px] md:text-[22px]">Петров Константин Александрович</p>
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
            +7 (999) 853-40-23
          </div>
          <div className="ml-[15px]">
            <span className={`badge badge-outline ${phoneStatus ? "badge-success" : null}`}>
              {phoneStatus ? "Активен" : "Заблокирован"}
            </span>
          </div>
        </div>

        <div className="card-body pt-[30px]">
          <p className={`mb-[5px] ${textSize.default} ${textColor.grey}`}>Мой тариф</p>
          <p className={`tarif mb-[5px] text-[16px] font-semibold ${textColor.darkBlue}`}>Интернет 50 Гб за 200</p>
          <a className={`btn-link ${textColor.primary}`} href="#">
            Подробнее
          </a>
        </div>

        <div className="card-body px-[0] xs:justify-self-end xs:pr-[40px] md:justify-self-start">
          <p className={`mb-[5px] ${textSize.default} ${textColor.grey}`}>Мой баланс</p>
          <p className={`mb-[5px] font-semibold ${textColor.darkBlue} xs:text-[20px] md:text-[30px]`}>250 ₽</p>
          <Button buttonType="default" title="Пополнить" onClickCb={() => navigate(mainRoutes.balance)} />
        </div>
      </div>

      <div className="grid grid-cols-2 xs:mx-[20px] xs:gap-5 md:mx-[0] md:gap-10 md:px-[45px]">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Остатки по пакетам</h3>
          </div>
          <div className="card-body flex flex-row justify-between xs:flex-col xs:items-center md:flex-row">
            <CircleProgressBar color={textColor.primary} nameOfValue="Мин" initialValue={300} remainderValue={210} />
            <CircleProgressBar color={textColor.lightBlue} nameOfValue="СМС" initialValue={100} remainderValue={60} />
            <CircleProgressBar
              color={textColor.lightGrey}
              nameOfValue="ГБ"
              initialValue={500}
              remainderValue={300}
              valueInfinity={true}
            />
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
            <div className="sum mb-[10px] text-[30px] font-semibold">{sum} ₽</div>
            <div className="progress py-[5px]">
              <div
                className={`${bgColor.primary} progress-bar mr-[5px] rounded-[3px] py-[5px]`}
                style={{ width: `${perOne * 100}%` }}
              ></div>
              <div
                className="progress-bar mr-[5px] rounded-[3px] bg-[#FFCC00] py-[5px]"
                style={{ width: `${perTwo * 100}%` }}
              ></div>
              <div
                className="progress-bar rounded-[3px] bg-[#5890BC] py-[5px]"
                style={{ width: `${perThree * 100}%` }}
              ></div>
            </div>

            <div className="explanation mt-[20px] flex xs:flex-col">
              <div className={`information flex items-center ${textSize.default} font-medium md:mr-[15px]`}>
                <span className={`${bgColor.primary} badge badge-dot size-2.5 md:mr-[5px]`}></span>
                <span className="md:mr-[5px]">Связь</span>
                <span>{expenses.communications}₽</span>
              </div>

              <div className={`information flex items-center ${textSize.default} font-medium md:mr-[15px]`}>
                <span className="badge badge-dot size-2.5 bg-[#FFCC00] md:mr-[5px]"></span>
                <span className="md:mr-[5px]">Услуги</span>
                <span>{expenses.services}₽</span>
              </div>

              <div className={`information mr-[15px] flex items-center ${textSize.default} font-medium`}>
                <span className="badge badge-dot size-2.5 bg-[#5890BC] md:mr-[5px]"></span>
                <span className="md:mr-[5px]">Другое</span>
                <span>{expenses.other}₽</span>
              </div>
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
                    className={`${visibleTab ? "active" : null} tab text-[14px] text-[#4B5675]`}
                    data-tab-toggle="#tab_1_1"
                    onClick={() => setVisibleTab(true)}
                  >
                    Без абонентской платы
                  </button>
                  <button
                    className={`${!visibleTab ? "active" : null} tab text-[14px] text-[#4B5675]`}
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
