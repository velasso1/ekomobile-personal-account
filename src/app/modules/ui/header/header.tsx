import React, { FC } from "react";

import HeaderSelect from "../header-select/header-select";

import icongosu from "../../../assets/images/gosu.svg";
import notifGreen from "../../../assets/images/notif-green.svg";
import notifRed from "../../../assets/images/notif-red.svg";

import { defaultStyles } from "../../../utils/default-styles";
import { useNavigate } from "react-router-dom";
import { mainRoutes } from "../../../utils/routes-name/main-routes";

interface IHeaderProps {
  changeVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<IHeaderProps> = ({ changeVis }) => {
  const { bgColor, textColor } = defaultStyles;
  const navigate = useNavigate();

  return (
    <header
      className={`flex h-full items-center ${bgColor.littleGrey} pt-5 xs:justify-center md:px-[45px] lg:justify-start`}
    >
      <div className="flex items-center sm:justify-center lg:justify-start">
        <div className="">
          <button className="btn mr-[40px] md:hidden" onClick={() => changeVis((prev) => !prev)}>
            <div className="space-y-2">
              <span className="block h-0.5 w-8 bg-gray-600"></span>
              <span className="block h-0.5 w-8 bg-gray-600"></span>
              <span className="block h-0.5 w-8 bg-gray-600"></span>
            </div>
          </button>
        </div>

        <HeaderSelect label="Мои номера:" />
        <div className="icons flex items-center">
          <div
            className={`relative mx-[10px] cursor-pointer items-center rounded-[8px] ${bgColor.white} p-[5px]`}
            onClick={() => navigate(mainRoutes.gosuslugiNumbers)}
          >
            <img className="w-[22px]" src={icongosu} alt="ГосУслуги" />
            <img className="absolute right-1 top-1" src={notifGreen} alt="notification" />
          </div>
          <div
            className={`notif relative cursor-pointer items-center rounded-[8px] ${bgColor.white} p-[5px] text-[22px] leading-[20px] ${textColor.grey}`}
          >
            <i className="ki-outline ki-notification"></i>
            <img className="absolute right-1 top-1" src={notifRed} alt="notification" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
