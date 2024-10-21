import { FC } from "react";

import { useQuery } from "@apollo/client";
import { GET_REMAINDERS } from "../../../api/apollo/queries/get-remainders";

import { IRemaindersResponse } from "../../../types/remainderpage-response-types";

import Loader from "../../ui/loader/loader";
import { WarningBadge } from "../../ui";
import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";

import { defaultStyles } from "../../../utils/default-styles";

type TProgressBarColor = "primary" | "lightBlue" | "lightGrey";

const RemainderPage: FC = () => {
  const { data, loading, error } = useQuery<IRemaindersResponse>(GET_REMAINDERS);

  const { bgColor, textColor, textSize } = defaultStyles;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <WarningBadge isError={true} />;
  }

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
            {data.onlyRemainder.account.number.remains.simple.map((item, index) => {
              const progressWidth: string = item.isUnlimited ? "100%" : (+item.balance / +item.size) * 100 + "%";
              const progressColor: TProgressBarColor[] = ["primary", "lightBlue", "lightGrey"];

              return (
                <tr className="" key={item.measure}>
                  <td className="flex items-center">
                    <div className="w-[150px]">{item.measure}</div>
                    <div className="progress bg-[#eaeaea]">
                      <div
                        className={`progress-bar rounded-[0px] ${bgColor[`${progressColor[index]}`]} px-[10px] py-[5px] text-left`}
                        style={{
                          width: `${progressWidth}`,
                        }}
                      >
                        <span className={`${textSize.default} ${textColor.white}`}>
                          {item.isUnlimited ? "∞" : ((+item.balance / +item.size) * 100).toFixed() + "%"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{+item.size < 0 ? "Безлимитно" : item.size}</td>
                  <td>{+item.balance < 0 ? "Безлимитно" : item.balance}</td>
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
