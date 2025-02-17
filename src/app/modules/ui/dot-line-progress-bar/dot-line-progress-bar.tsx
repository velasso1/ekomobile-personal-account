import { FC } from "react";

import { IDotForLineProgressBarProps } from "../../../types/line-progress-types";

import { defaultStyles } from "../../../utils/default-styles";

const DotForLineProgressBar: FC<IDotForLineProgressBarProps> = ({ color, value, name }) => {
  const { textSize } = defaultStyles;

  return (
    <div className={`information mr-[15px] flex items-center ${textSize.default} font-medium`}>
      <span className={`badge badge-dot mr-[5px] size-2.5 ${color}`}></span>
      <span className="mr-[5px]">{name}</span>
      <span>{typeof value === "string" ? value : value.sum} ₽</span>
    </div>
  );
};

export default DotForLineProgressBar;
