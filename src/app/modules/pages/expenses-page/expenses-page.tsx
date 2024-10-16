import { FC, useState } from "react";

import TableExpenses from "../../ui/tables/table-expenses";
import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";
import LineProgressBar from "../../ui/line-progress-bar/line-progress-bar";

import config from "../../../../../auxuliary.json";

interface IExpsensesState {
  firstValue: number;
  secondValue: number;
}

const ExpensesPage: FC = () => {
  const [selectState, setSelectState] = useState<string>();
  const [expensesValue, setExpensesValue] = useState<IExpsensesState>({
    firstValue: 2500,
    secondValue: 1520,
  });

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
            {expensesValue.firstValue + expensesValue.secondValue},00 ₽
          </div>
          <div className="expenses flex w-full flex-col">
            <LineProgressBar
              firstValue={expensesValue.firstValue}
              firstbarName="Услуга"
              secondValue={expensesValue.secondValue}
              secondBarName="Роуминг"
            />
          </div>
        </div>
      </Card>
      <TableExpenses tableItem={config.expensesOperations} />
    </div>
  );
};

export default ExpensesPage;
