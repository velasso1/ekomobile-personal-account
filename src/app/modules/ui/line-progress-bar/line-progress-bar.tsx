import { FC } from "react";

import DotForLineProgressBar from "../dot-line-progress-bar/dot-line-progress-bar";

import { INodeItem } from "../../../types/expensespage-response-types";

import { defaultStyles } from "../../../utils/default-styles";
import { ExpensesNames } from "../../../utils/auxuliary-data/expenses-names";
import { getProgressColor } from "../../../utils/auxuliary-data/progress-color";
import { moneyFormatter } from "../../../utils/helpers/money-formatter";

interface ILineProgressBarProps {
  progressItem: INodeItem[];
  totalExpenses: number;
}

const LineProgressBar: FC<ILineProgressBarProps> = ({ progressItem, totalExpenses }) => {
  const { bgColor } = defaultStyles;

  console.log(progressItem);

  const totalForServices: number = progressItem.reduce((acc, value) => {
    return acc + (value.type === "PRICE_PLAN" ? 0 : value.amount) * -1;
  }, 0);

  const totalForPricePlan: number = progressItem.reduce((acc, value) => {
    return acc + (value.type === "PRICE_PLAN" ? value.amount : 0) * -1;
  }, 0);

  return (
    <div className="">
      <div className="progress mb-[20px]">
        <div
          className={`${bgColor[`${getProgressColor[3]}`]} progress-bar mr-[5px] rounded-[3px] py-[5px]`}
          style={{ width: `${totalForServices / totalExpenses}%` }}
        ></div>
        <div
          className={`${bgColor[`${getProgressColor[4]}`]} progress-bar mr-[5px] rounded-[3px] py-[5px]`}
          style={{ width: `${totalForPricePlan / totalExpenses}%` }}
        ></div>
      </div>

      <div className="flex">
        <DotForLineProgressBar
          name={ExpensesNames["SERVICES"]}
          color={bgColor[`${getProgressColor[3]}`]}
          value={moneyFormatter(totalForServices)}
        />

        <DotForLineProgressBar
          name={ExpensesNames["PRICE_PLAN"]}
          color={bgColor[`${getProgressColor[4]}`]}
          value={moneyFormatter(totalForPricePlan)}
        />
      </div>
    </div>
  );
};

export default LineProgressBar;
