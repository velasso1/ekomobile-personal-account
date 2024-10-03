import { FC, useState } from "react";

import TableExpenses from "../../ui/tables/table-expenses";
import LineProgressBar from "../../ui/line-progress-bar/line-progress-bar";
import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";

import { defaultStyles } from "../../../utils/default-styles";

import config from "../../../../../auxuliary.json";

interface IExpsensesState {
  service: number;
  other: number;
}

const ExpensesPage: FC = () => {
  const [selectState, setSelectState] = useState<string>();
  const [expensesValue, setExpensesValue] = useState<IExpsensesState>({
    service: 150,
    other: 750,
  });

  const { bgColor } = defaultStyles;

  // temp example
  const sum = expensesValue.service + expensesValue.other;
  const perOne = expensesValue.service / sum;
  const perTwo = expensesValue.other / sum;
  //

  return (
    <div className="mb-[40px] h-full w-full px-[45px] pt-[40px]">
      <PageTitle title="Расходы" />
      <Card>
        <div className="w-[20vw]">
          <select
            className="select"
            name="select"
            onChange={(e) => setSelectState(e.target.value)}
            defaultValue={"0"}
            value={selectState}
          >
            {config.month.map((item, index) => {
              return (
                <option className="cursor-pointer" key={item} value={index}>
                  {item}
                </option>
              );
            })}
          </select>
          <div className="full-sum my-[20px] text-[30px] font-semibold">
            {expensesValue.service + expensesValue.other},00 ₽
          </div>
          <div className="exprenses flex w-full flex-col">
            <div className="progress mb-[20px]">
              <div
                className={`progress-bar mr-[5px] rounded-[3px] ${bgColor.primary} py-[5px]`}
                style={{ width: `${perOne * 100}%` }}
              ></div>
              <div
                className={`progress-bar mr-[5px] rounded-[3px] ${bgColor.yellow} py-[5px]`}
                style={{ width: `${perTwo * 100}%` }}
              ></div>
            </div>

            <div className="flex">
              <LineProgressBar name="Услуга" color={bgColor.primary} value={expensesValue.service} />
              <LineProgressBar name="Тарифный план" color={bgColor.yellow} value={expensesValue.other} />
            </div>
          </div>
        </div>
      </Card>
      <TableExpenses tableItem={config.expensesOperations} />
    </div>
  );
};

export default ExpensesPage;
