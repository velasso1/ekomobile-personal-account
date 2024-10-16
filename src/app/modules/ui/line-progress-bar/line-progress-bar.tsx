import { FC } from "react";

import DotForLineProgressBar from "../dot-line-progress-bar/dot-line-progress-bar";

import { defaultStyles } from "../../../utils/default-styles";

interface ILineProgressBarProps {
  firstValue: number;
  firstbarName: string;
  secondValue: number;
  secondBarName: string;
}

const LineProgressBar: FC<ILineProgressBarProps> = ({ firstValue, firstbarName, secondValue, secondBarName }) => {
  const { bgColor } = defaultStyles;

  const sum = firstValue + secondValue;
  const progressFirst = (firstValue / sum) * 100;
  const progressSecond = (secondValue / sum) * 100;

  return (
    <div className="">
      <div className="progress mb-[20px]">
        <div
          className={`${bgColor.primary} progress-bar mr-[5px] rounded-[3px] py-[5px]`}
          style={{ width: `${progressFirst}%` }}
        ></div>
        <div
          className={`${bgColor.yellow} progress-bar mr-[5px] rounded-[3px] py-[5px]`}
          style={{ width: `${progressSecond}%` }}
        ></div>
      </div>

      <div className="flex">
        <DotForLineProgressBar name={firstbarName} color={bgColor.primary} value={firstValue} />
        <DotForLineProgressBar name={secondBarName} color={bgColor.yellow} value={secondValue} />
      </div>
    </div>
  );
};

export default LineProgressBar;
