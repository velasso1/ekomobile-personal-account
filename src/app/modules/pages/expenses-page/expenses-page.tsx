import { FC, useState } from "react";

import { useQuery } from "@apollo/client";
import { GET_EXPENSES } from "../../../api/apollo/queries/get-expenses";

import { IExpensesResponse } from "../../../types/expensespage-response-types";

import Loader from "../../ui/loader/loader";
import { WarningBadge } from "../../ui";
import TableExpenses from "../../ui/tables/table-expenses";
import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";
import LineProgressBar from "../../ui/line-progress-bar/line-progress-bar";
import { month } from "../../../utils/auxuliary-data/month";
import { moneyFormatter } from "../../../utils/helpers/money-formatter";

const ExpensesPage: FC = () => {
  const [selectState, setSelectState] = useState<number>(new Date().getMonth() + 1);

  const { data, loading, error, refetch } = useQuery<IExpensesResponse>(GET_EXPENSES, {
    variables: {
      year: new Date().getFullYear(),
      month: selectState,
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <WarningBadge isError={true} />;
  }

  return (
    <div className="mb-[40px] h-full w-full px-[45px] pt-[40px]">
      <PageTitle title="Расходы" />
      <Card>
        <div className="w-[20vw]">
          <select
            className="select"
            name="select"
            onChange={(e) => {
              setSelectState(+e.target.value);
              refetch({ year: new Date().getFullYear(), month: selectState });
            }}
            value={selectState}
          >
            {data.me.account.number.expenses.availableMonths.map((item) => {
              return (
                <option className="cursor-pointer" key={item.month} value={item.month}>
                  {month[item.month - 1]}
                </option>
              );
            })}
          </select>
          <div className="full-sum my-[20px] text-[30px] font-semibold">
            {moneyFormatter(data.me.account.number.expenses.month.amount.total)} ₽
          </div>
          <div className="expenses flex w-full flex-col">
            <LineProgressBar
              progressItem={data.me.account.number.expenses.month.transactionList.nodes}
              totalExpenses={+moneyFormatter(data.me.account.number.expenses.month.amount.total)}
            />
          </div>
        </div>
      </Card>
      <TableExpenses tableItem={data.me.account.number.expenses.month.transactionList.nodes} />
    </div>
  );
};

export default ExpensesPage;
