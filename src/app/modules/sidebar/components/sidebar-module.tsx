import React, { FC, useContext } from "react";

import { useAppDispatch } from "../../../store";
import { logOut } from "../../../store/slices/auth-slice";

import SideBarItem from "./side-bar-items/side-bar-item";
import { Button } from "../../ui/button";

import { Context } from "../../main/main-module";

import logo from "../../../assets/images/logo.svg";

import { defaultStyles } from "../../../utils/default-styles";

interface ISideBarProps {
  changeVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: FC<ISideBarProps> = ({ changeVis }) => {
  const dispatch = useAppDispatch();
  const sidePanelOpen = useContext(Context);

  const { textColor } = defaultStyles;

  return (
    <div
      className={`flex h-[100vh] min-w-[290px] max-w-[100%] flex-col items-center bg-[#000] md:fixed md:block lg:fixed lg:left-[0px] ${sidePanelOpen ? "absolute" : "hidden"} z-10`}
      data-drawer="true"
      id="drawer_1"
      data-drawer-disable-scroll="false"
    >
      <button
        className={`btn absolute left-[85%] top-0 ${textColor.white} md:hidden`}
        onClick={() => changeVis((prev) => !prev)}
      >
        <i className="ki-filled ki-cross"></i>
      </button>
      <div className="mb-[10px] flex w-full items-start justify-start px-[30px] py-[20px]">
        <img src={logo} alt="Экомобайл" />
      </div>
      <SideBarItem title="Главная" icon="ki-home" redirectTo="main" />
      <SideBarItem title="Мои номера" icon="ki-data" redirectTo="numbers" />
      <SideBarItem title="Услуги" icon="ki-briefcase" redirectTo="services" />
      <SideBarItem title="Расходы" icon="ki-chart-pie-simple" redirectTo="expenses" />
      <SideBarItem title="Детализация" icon="ki-setting-2" redirectTo="details" />
      <SideBarItem title="Остатки пакетов" icon="ki-chart-simple" redirectTo="remainder" />
      <SideBarItem title="Пополнение баланса" icon="ki-wallet" redirectTo="balance" />
      <SideBarItem title="Заявки" icon="ki-message-text" redirectTo="applications" />
      <SideBarItem title="Профиль" icon="ki-user" redirectTo="profile" />
      <div className="flex w-full px-[20px] pt-[27vh]">
        <Button
          buttonType="custom"
          customStyle={`btn-outline border-[#fff] ${textColor.white}`}
          title="Выйти"
          onClickCb={() => {
            dispatch(logOut());
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};

export default SideBar;
