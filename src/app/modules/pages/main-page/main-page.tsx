import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { WarningBadge } from '../../ui';
import CircleProgressBar from '../../ui/circle-progress-bar/circle-progress-bar';
import ServicesButton from '../../ui/services-button/services-button';

import config from '../../../../../auxuliary.json';

type ExpensesCalc = {
  communications: number;
  services: number;
  other: number;
};

const MainPage: FC = () => {
  const [visibleTab, setVisibleTab] = useState<boolean>(true);

  // temp example
  const [expenses, setExpenses] = useState<ExpensesCalc>({
    communications: 752,
    services: 215,
    other: 300,
  });

  const sum = expenses.communications + expenses.services + expenses.other;
  const perOne = expenses.communications / sum;
  const perTwo = expenses.services / sum;
  const perThree = expenses.other / sum;
  // temp example

  const navigate = useNavigate();
  return (
    <div className="main-page h-full w-full py-[8px]">
      <WarningBadge
        title="Требуется подтверждение"
        message="Требуется подтверждение номера на Госуслугах."
        buttonText="Подтвердить"
      />

      <div className="card mx-[45px] mb-[40px] grid grid-cols-2 flex-row">
        <div className="card-body">
          <p className="text-[22px] font-semibold">
            Петров Константин Александрович
          </p>
          <a
            className="btn btn-link text-[13px] text-[#005DA6]"
            href="#"
            onClick={() => navigate('/main/profile')}
          >
            Профиль
          </a>
        </div>
        <div className="card-body my-[20px] mr-[40px] flex border-b-2 border-[#EAECEE] pl-[0] pt-[5px]">
          <div className="text-[18px] font-semibold text-[#071437]">
            NUMBER-VARIABLE
          </div>
          <div className="ml-[15px]">
            <span className="badge badge-outline badge-success">Активен</span>?
            <span className="badge badge-outline">Заблокирован</span>
          </div>
        </div>

        <div className="card-body pt-[30px]">
          <p className="mb-[5px] text-[13px] text-[#78829D]">Мой тариф</p>
          <p className="tarif mb-[5px] text-[16px] font-semibold text-[#071437]">
            Интернет 50 Гб за 200
          </p>
          <a className="btn btn-link text-[#005DA6]" href="#">
            Подробнее
          </a>
        </div>

        <div className="card-body px-[0]">
          <p className="mb-[5px] text-[13px] text-[#78829D]">Мой баланс</p>
          <p className="mb-[5px] text-[30px] font-semibold text-[#071437]">
            250 ₽
          </p>
          <button className="btn bg-[#005DA6] text-[#fff]">Пополнить</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 px-[45px]">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Остатки по пакетам</h3>
          </div>
          <div className="card-body flex flex-row justify-between">
            <CircleProgressBar
              color="#005DA6"
              nameOfValue="Мин"
              initialValue={300}
              remainderValue={210}
            />
            <CircleProgressBar
              color="#5890BC"
              nameOfValue="СМС"
              initialValue={100}
              remainderValue={60}
            />
            <CircleProgressBar
              color="#A8B1C3"
              nameOfValue="ГБ"
              initialValue={500}
              remainderValue={300}
              valueInfinity={true}
            />
          </div>
          <div className="card-footer justify-center">
            <a className="btn btn-link text-[#005DA6]" href="#">
              Подробнее
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Расходы текущего периода</h3>
          </div>
          <div className="card-body">
            <div className="sum mb-[10px] text-[30px] font-semibold">
              {sum} ₽
            </div>
            <div className="progress py-[5px]">
              <div
                className="progress-bar mr-[5px] rounded-[3px] bg-[#005DA6] py-[5px]"
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

            <div className="explanation mt-[20px] flex">
              <div className="information mr-[15px] flex items-center text-[12px] font-medium">
                <span className="badge badge-dot mr-[5px] size-2.5 bg-[#005DA6]"></span>
                <span className="mr-[5px]">Связь</span>
                <span>{expenses.communications} ₽</span>
              </div>

              <div className="information mr-[15px] flex items-center text-[12px] font-medium">
                <span className="badge badge-dot mr-[5px] size-2.5 bg-[#FFCC00]"></span>
                <span className="mr-[5px]">Услуги</span>
                <span>{expenses.services} ₽</span>
              </div>

              <div className="information mr-[15px] flex items-center text-[12px] font-medium">
                <span className="badge badge-dot mr-[5px] size-2.5 bg-[#5890BC]"></span>
                <span className="mr-[5px]">Другое</span>
                <span>{expenses.other} ₽</span>
              </div>
            </div>
          </div>
          <div className="card-footer justify-center">
            <a className="btn btn-link text-[#005DA6]" href="#">
              Посмотреть все
            </a>
          </div>
        </div>

        <div className="">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Мои услуги</h3>
            </div>
            <div className="card-body">
              <div>
                <div className="tabs mb-5" data-tabs="true ">
                  <button
                    className={`${visibleTab ? 'active' : null} tab text-[14px] text-[#4B5675]`}
                    data-tab-toggle="#tab_1_1"
                    onClick={() => setVisibleTab(true)}
                  >
                    Без абонентской платы
                  </button>
                  <button
                    className={`${!visibleTab ? 'active' : null} tab text-[14px] text-[#4B5675]`}
                    data-tab-toggle="#tab_1_2"
                    onClick={() => setVisibleTab(false)}
                  >
                    С абонентской платой
                  </button>
                </div>
                {visibleTab ? (
                  <div className="" id="tab_1_1">
                    {config.buttons.map((itm, idx) => {
                      return <ServicesButton key={idx} name={itm.name} />;
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
              <a className="btn btn-link text-[#005DA6]" href="#">
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
