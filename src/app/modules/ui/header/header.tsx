import React, { FC } from 'react';

import icongosu from '../../../assets/images/gosu.svg';
import notifGreen from '../../../assets/images/notif-green.svg';
import notifRed from '../../../assets/images/notif-red.svg';

type TempExampleForOption = {
  optionText: string;
  disabled: boolean;
  bold?: boolean;
};

const Header: FC = () => {
  const exampleArr: TempExampleForOption[] = [
    { optionText: 'Группа 1', disabled: true, bold: true },
    { optionText: '+7 (900) 123-45-61', disabled: false },
    { optionText: '+7 (900) 123-45-62', disabled: false },
    { optionText: '+7 (900) 123-45-63', disabled: false },
    { optionText: 'Группа 2', disabled: true, bold: true },
    { optionText: '+7 (900) 123-45-64', disabled: false },
  ];
  return (
    <header className="flex h-full w-full items-center justify-center bg-[#F6F8F8] px-[45px] pt-5">
      <div className="flex w-full">
        <div className="flex flex-wrap items-baseline gap-2.5 rounded-[8px] lg:flex-nowrap">
          <label className="form-label max-w-32 font-medium text-[#161616]">
            Мои номера:{' '}
          </label>
          <select
            className="select ml-[-30px] h-[32px] w-[230px] rounded-[8px] border-none hover:cursor-pointer"
            name="select"
          >
            {exampleArr.map((itm, idx) => {
              return (
                <option
                  className={`${itm.bold ? 'font-semibold' : null} hover:cursor-pointer`}
                  value={itm.optionText}
                  key={idx}
                  disabled={itm.disabled}
                >
                  {itm.optionText}
                </option>
              );
            })}
          </select>
        </div>
        <div className="icons flex items-center">
          <div className="gosuslugi relative mx-[10px] cursor-pointer items-center rounded-[8px] bg-[#fff] p-[5px]">
            <img className="w-[22px]" src={icongosu} alt="ГосУслуги" />
            <img
              className="absolute right-1 top-1"
              src={notifGreen}
              alt="notification"
            />
          </div>
          <div className="notif relative cursor-pointer items-center rounded-[8px] bg-[#fff] p-[5px] text-[22px] leading-[20px] text-[#78829D]">
            <i className="ki-outline ki-notification"></i>
            <img
              className="absolute right-1 top-1"
              src={notifRed}
              alt="notification"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
