import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import SideBarItem from './side-bar-items/side-bar-item';

import logo from '../../../assets/images/logo.svg';

const SideBar: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="fixed flex h-full min-w-[290px] max-w-[100%] flex-col items-center bg-[#000]"
        data-drawer="true"
        id="drawer_1"
      >
        <div className="mb-[10px] flex w-full items-start justify-start px-[30px] py-[20px]">
          <img src={logo} alt="Экомобайл" />
        </div>
        <SideBarItem title="Главная" icon="ki-home" redirectTo="main" />
        <SideBarItem title="Мои номера" icon="ki-data" redirectTo="numbers" />
        <SideBarItem title="Услуги" icon="ki-briefcase" redirectTo="services" />
        <SideBarItem
          title="Расходы"
          icon="ki-chart-pie-simple"
          redirectTo="expenses"
        />
        <SideBarItem
          title="Детализация"
          icon="ki-setting-2"
          redirectTo="details"
        />
        <SideBarItem
          title="Остатки пакетов"
          icon="ki-chart-simple"
          redirectTo="remainder"
        />
        <SideBarItem
          title="Пополнение баланса"
          icon="ki-wallet"
          redirectTo="balance"
        />
        <SideBarItem
          title="Заявки"
          icon="ki-message-text"
          redirectTo="applications"
        />
        <SideBarItem title="Профиль" icon="ki-user" redirectTo="profile" />
        <div className="flex w-full px-[20px] pt-[27vh]">
          <button
            className="btn btn-outline border-[#fff] text-[#fff]"
            onClick={() => navigate('/auth/login')}
          >
            Выйти
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
