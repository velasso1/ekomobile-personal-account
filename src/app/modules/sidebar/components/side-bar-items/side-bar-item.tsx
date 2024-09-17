import React, { FC, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

interface ISideBarProps {
  title: string;
  icon: string;
  redirectTo: string;
}

const SideBarItem: FC<ISideBarProps> = ({ title, icon, redirectTo }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [hover, setHover] = useState<boolean>(false);

  return (
    <>
      <div
        className={`${title === 'Профиль' ? 'mt-[40px]' : null} flex w-[232px] items-start rounded-md ${params['*'] == redirectTo ? 'bg-[#292929]' : null} px-[15px] py-[10px] text-left hover:cursor-pointer`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => navigate(`/main/${redirectTo}`)}
      >
        <a className="flex flex-row text-[13px]">
          <span className="menu-icon">
            <i
              className={`ki-outline ${icon} cursor-pointer ${hover || params['*'] == redirectTo ? 'text-[#005DA6]' : 'text-[#A8B1C3]'} `}
            ></i>
          </span>
          <span
            className={`ml-[10px] cursor-pointer text-[#A8B1C3] text-[400] ${hover || params['*'] == redirectTo ? 'text-[#ffffff]' : 'text-[#A8B1C3]'}`}
          >
            {title}
          </span>
        </a>
      </div>
    </>
  );
};

export default SideBarItem;
