import { FC, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { ISideBarProps } from "../../../../types/side-bar-types";

import { defaultStyles } from "../../../../utils/default-styles";

const SideBarItem: FC<ISideBarProps> = ({ title, icon, redirectTo }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [hover, setHover] = useState<boolean>(false);

  const { textSize, textColor } = defaultStyles;

  return (
    <div
      className={`${title === "Профиль" ? "mt-[40px]" : null} flex w-[232px] items-start rounded-md ${params["*"] === redirectTo ? "bg-[#292929]" : null} px-[15px] py-[10px] text-left hover:cursor-pointer`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(`/main/${redirectTo}`)}
    >
      <a className={`flex flex-row ${textSize.default}`}>
        <span className="menu-icon">
          <i
            className={`ki-outline ${icon} cursor-pointer ${hover || params["*"] === redirectTo ? textColor.primary : textColor.lightGrey} `}
          ></i>
        </span>
        <span
          className={`ml-[10px] cursor-pointer ${textColor.lightGrey} text-[400] ${hover || params["*"] === redirectTo ? textColor.white : textColor.lightGrey}`}
        >
          {title}
        </span>
      </a>
    </div>
  );
};

export default SideBarItem;
