import { FC } from "react";

import DotForLineProgressBar from "../dot-line-progress-bar/dot-line-progress-bar";

import { INodeItem } from "../../../types/expensespage-response-types";

import { defaultStyles } from "../../../utils/default-styles";
import { ExpensesNames } from "../../../utils/auxuliary-data/expenses-names";
import { getProgressColor } from "../../../utils/auxuliary-data/progress-color";

interface ILineProgressBarProps {
  progressItem: INodeItem[];
  totalExpenses: number;
}

const LineProgressBar: FC<ILineProgressBarProps> = ({ progressItem, totalExpenses }) => {
  const { bgColor } = defaultStyles;

  return (
    <div className="">
      <div className="progress mb-[20px]">
        {progressItem.map((item, index) => {
          return (
            <div
              className={`${bgColor[`${getProgressColor[index]}`]} progress-bar mr-[5px] rounded-[3px] py-[5px]`}
              style={{ width: `${(item.amount * 100) / totalExpenses}%` }}
            ></div>
          );
        })}
      </div>

      <div className="flex">
        {progressItem.map((item, index) => {
          return (
            <DotForLineProgressBar
              name={ExpensesNames[item.name]}
              color={bgColor[`${getProgressColor[index]}`]}
              value={item.amount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LineProgressBar;
