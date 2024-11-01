import { FC, useState, useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { GET_CURRENT_EXPENSES } from "../../../api/apollo/queries/get-expenses";

import { useAppSelector } from "../../../store";

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

  const date = new Date();

  const { newCurrentData, selectedNumber } = useAppSelector((state) => state.userSlice);

  const [getExpenses, { data: currentData, loading: currentLoading, error: currentError, refetch }] =
    useLazyQuery<IExpensesResponse>(GET_CURRENT_EXPENSES);

  useEffect(() => {
    getExpenses({
      variables: {
        msisdn: selectedNumber,
        year: date.getFullYear(),
        month: selectState,
      },
    });
  }, [selectedNumber]);

  if (!currentData || !newCurrentData || currentLoading) {
    return <Loader />;
  }

  if (currentError) {
    return <WarningBadge isError={true} />;
  }

  console.log(currentData.me.account.billingNumber.expenses.month.month.month);

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
              console.log(e.target.value);

              getExpenses({
                variables: {
                  msisdn: selectedNumber,
                  year: date.getFullYear(),
                  month: +e.target.value,
                },
              });
              // refetch({ year: new Date().getFullYear(), month: +e.target.value });
            }}
            value={selectState}
          >
            {currentData.me.account.billingNumber.expenses.availableMonths.map((item) => {
              return (
                <option className="cursor-pointer" key={item.month} value={item.month}>
                  {month[item.month - 1]}
                </option>
              );
            })}
          </select>
          <div className="full-sum my-[20px] text-[30px] font-semibold">
            {moneyFormatter(currentData.me.account.billingNumber.expenses.month.amount.total)} ₽
          </div>
          <div className="expenses flex w-full flex-col">
            <LineProgressBar
              progressItem={currentData.me.account.billingNumber.expenses.month.transactionList.nodes}
              totalExpenses={currentData.me.account.billingNumber.expenses.month.amount.total / 100}
            />
          </div>
        </div>
      </Card>
      <TableExpenses tableItem={currentData.me.account.billingNumber.expenses.month.transactionList.nodes} />
    </div>
  );
};

export default ExpensesPage;
