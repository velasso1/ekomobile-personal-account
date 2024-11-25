import { FC, useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { GET_REMAINDERS } from "../../../api/apollo/queries/get-remainders";

import { IRemaindersResponse } from "../../../types/remainderpage-response-types";
import { IRemainsFullItem } from "../../../types/new-current-data-types";
import { IResidueCombainer } from "../../../utils/helpers/residue-combainer";

import { useAppSelector } from "../../../store";

import Loader from "../../ui/loader/loader";
import { WarningBadge } from "../../ui";
import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";

import { defaultStyles } from "../../../utils/default-styles";
import { CircleProgressName } from "../../../utils/auxuliary-data/expenses-names";
import residueCombainer from "../../../utils/helpers/residue-combainer";

type TProgressBarColor = "primary" | "lightBlue" | "lightGrey";

const RemainderPage: FC = () => {
  // const { data, loading, error } = useQuery<IRemaindersResponse>(GET_REMAINDERS);
  const [remainders, setRemainders] = useState<IResidueCombainer[]>();
  const { newCurrentData } = useAppSelector((state) => state.userSlice);

  const { bgColor, textColor, textSize } = defaultStyles;

  useEffect(() => {
    if (newCurrentData) {
      setRemainders(residueCombainer(newCurrentData.me.account.billingNumber.remains.full));
    }
  }, [newCurrentData]);

  if (!newCurrentData || !remainders) {
    return <Loader />;
  }

  // if (error) {
  //   return <WarningBadge isError={true} />;
  // }

  return (
    <div className="full h-full px-[45px] pt-[40px]">
      <PageTitle title="Остатки пакетов" />
      <Card>
        <table className="table align-middle text-sm font-medium text-gray-700">
          <thead>
            <tr>
              <th>Тип остатков</th>
              <th>Общее количество</th>
              <th>Сколько осталось</th>
            </tr>
          </thead>
          <tbody>
            {remainders?.map((item, index) => {
              const progressWidth: string = item.isUnlimited ? "100%" : (item.balance / item.size) * 100 + "%";
              const progressColor: TProgressBarColor[] = ["primary", "lightBlue", "lightGrey"];
              return (
                <tr className="" key={crypto.randomUUID()}>
                  <td className="flex items-center">
                    <div className="w-[150px]">{CircleProgressName[item.measure.slice(0, 3)]}</div>
                    <div className="progress bg-[#eaeaea]">
                      <div
                        className={`progress-bar rounded-[0px] ${bgColor[`${progressColor[index]}`]} px-[10px] py-[5px] text-left`}
                        style={{
                          width: `${progressWidth}`,
                        }}
                      >
                        <span className={`${textSize.default} ${textColor.white}`}>
                          {item.isUnlimited ? "∞" : ((item.balance / item.size) * 100).toFixed() + "%"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{item.isUnlimited ? "Безлимитно" : item.measure === "MB" ? item.size / 1024 : item.size}</td>
                  <td>
                    {item.isUnlimited ? "Безлимитно" : item.measure === "MB" ? item.balance / 1024 : item.balance}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default RemainderPage;
