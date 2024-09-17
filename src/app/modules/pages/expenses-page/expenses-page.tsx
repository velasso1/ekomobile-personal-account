import { FC, useState } from 'react';
import TableExpenses from '../../ui/tables/table-expenses';
import config from '../../../../../auxuliary.json';
import LineProgressBar from '../../ui/line-progress-bar/line-progress-bar';

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

  // temp example
  const sum = expensesValue.service + expensesValue.other;
  const perOne = expensesValue.service / sum;
  const perTwo = expensesValue.other / sum;
  //

  return (
    <div className="h-full w-full p-[40px] px-[45px]">
      <div className="numbers-title pb-[30px] text-[22px] font-semibold">
        Расходы
      </div>

      <div className="card mb-[40px]">
        <div className="card-body">
          <div className="w-[20vw]">
            <select
              className="select"
              name="select"
              onChange={(e) => setSelectState(e.target.value)}
              defaultValue={'0'}
              value={selectState}
            >
              {config.month.map((item, index) => {
                return (
                  <option className="cursor-pointer" key={index} value={index}>
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
                  className="progress-bar mr-[5px] rounded-[3px] bg-[#005DA6] py-[5px]"
                  style={{ width: `${perOne * 100}%` }}
                ></div>
                <div
                  className="progress-bar mr-[5px] rounded-[3px] bg-[#FFCC00] py-[5px]"
                  style={{ width: `${perTwo * 100}%` }}
                ></div>
              </div>

              <div className="flex">
                <LineProgressBar
                  name="Услуга"
                  color="#005DA6"
                  value={expensesValue.service}
                />
                <LineProgressBar
                  name="Тарифный план"
                  color="#FFCC00"
                  value={expensesValue.other}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TableExpenses tableItem={config.expensesOperations} />
    </div>
  );
};

export default ExpensesPage;
