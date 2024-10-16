import { FC } from "react";

import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";

import { defaultStyles } from "../../../utils/default-styles";

import config from "../../../../../auxuliary.json";

interface IRemaindersItem {
  typeRemainder: string;
  fullValue: string;
  remainderValue: string;
}

type TProgressBarColor = "primary" | "lightBlue" | "lightGrey";

const RemainderPage: FC = () => {
  const remainderItems: IRemaindersItem[] = config.remainders;

  const { bgColor, textColor, textSize } = defaultStyles;

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
            {remainderItems.map((item, index) => {
              const progressWidth: string =
                item.fullValue === "-1" ? "100%" : (+item.remainderValue / +item.fullValue) * 100 + "%";
              const progressColor: TProgressBarColor[] = ["primary", "lightBlue", "lightGrey"];

              return (
                <tr className="" key={item.typeRemainder}>
                  <td className="flex items-center">
                    <div className="w-[150px]">{item.typeRemainder}</div>
                    <div className="progress bg-[#eaeaea]">
                      <div
                        className={`progress-bar rounded-[0px] ${bgColor[`${progressColor[index]}`]} px-[10px] py-[5px] text-left`}
                        style={{
                          width: `${progressWidth}`,
                        }}
                      >
                        <span className={`${textSize.default} ${textColor.white}`}>
                          {+item.fullValue === -1
                            ? "∞"
                            : ((+item.remainderValue / +item.fullValue) * 100).toFixed() + "%"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{+item.fullValue < 0 ? "Безлимитно" : item.fullValue}</td>
                  <td>{+item.remainderValue < 0 ? "Безлимитно" : item.remainderValue}</td>
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
