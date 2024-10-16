import { FC, useState } from "react";

import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";
import Badge from "../../ui/badges/badge";

import { renderSwitch } from "../../../utils/helpers/render-switch";
import { defaultStyles } from "../../../utils/default-styles";

import config from "../../../../../auxuliary.json";

interface IAppItem {
  id: string;
  date: string;
  appName: string;
  status: "completed" | "accepted" | "in progress" | "error" | "declined" | "canceled";
  description: "string";
  result: "string";
}

const ApplicationPage: FC = () => {
  const [qtyApps, setQty] = useState<number>(2);

  const { textColor } = defaultStyles;

  return (
    <div className="h-full w-full px-[45px] pt-[40px]">
      <PageTitle title="Заявки" />
      <Card style="xs:w-[283px] md:w-auto xs:overflow-scroll lg:overflow-auto">
        <table className="table align-middle text-sm font-medium text-gray-700">
          <thead>
            <tr>
              <th>Дата подачи</th>
              <th>Название</th>
              <th>Статус</th>
              <th>Описание</th>
              <th>Результат</th>
            </tr>
          </thead>
          <tbody>
            {config.applicTable.map((item: IAppItem, index) => {
              const renderType = renderSwitch(item.status);
              if (index > qtyApps) return;
              return (
                <tr className="" key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.appName}</td>
                  <td>{<Badge type={renderType} />}</td>
                  <td>{item.date}</td>
                  <td>{item.result}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-full border-t-2 py-[10px] text-center">
          <a
            className={`btn btn-link ${textColor.primary}`}
            onClick={() =>
              setQty(() => {
                return qtyApps + (config.applicTable.length - qtyApps);
              })
            }
          >
            Смотреть все
          </a>
        </div>
      </Card>
    </div>
  );
};

export default ApplicationPage;
