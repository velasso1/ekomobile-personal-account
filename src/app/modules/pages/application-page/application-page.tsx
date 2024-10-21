import { FC, useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { GET_APPLICATIONS } from "../../../api/apollo/queries/get-applications";

import { IApplicationsResponse } from "../../../types/applications-types";

import Loader from "../../ui/loader/loader";
import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";
import Badge from "../../ui/badges/badge";
import { WarningBadge } from "../../ui";

import { renderSwitch } from "../../../utils/helpers/render-switch";
import { dateFormatter } from "../../../utils/helpers/date-formatter";
import { defaultStyles } from "../../../utils/default-styles";

const ApplicationPage: FC = () => {
  const [qtyApps, setQty] = useState<number>(5);

  const { textColor } = defaultStyles;

  const { data, loading, error } = useQuery<IApplicationsResponse>(GET_APPLICATIONS);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <WarningBadge isError={true} />;
  }

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
            {data.me.account.requestList.nodes.map((item, index) => {
              const renderType = renderSwitch(item.status);

              if (index > qtyApps) return;

              const date = dateFormatter(item.createdAt);

              return (
                <tr className="" key={item.id}>
                  <td>
                    {date.date}, {date.fullHours}
                  </td>
                  <td>{item.name}</td>
                  <td>{<Badge type={renderType} />}</td>
                  <td>{item.description}</td>
                  <td>{item.resultMessage}</td>
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
                return qtyApps + (data.me.account.requestList.nodes.length - qtyApps);
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
