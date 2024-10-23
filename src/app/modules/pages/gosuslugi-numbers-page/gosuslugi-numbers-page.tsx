import { FC } from "react";

import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import TableGosuslugi from "../../ui/tables/table-gosuslugi";

import { useNavigate } from "react-router-dom";
import { mainRoutes } from "../../../utils/routes-name/main-routes";
import { useQuery } from "@apollo/client";
import { GET_GU_DATA } from "../../../api/apollo/queries/get-numbers";
import Loader from "../../ui/loader/loader";
import { IGroup, IGroupNumber, TGUConfimationStatusId } from "../../../types/gu-types";

const staticTexts = {
  title: "Подтверждение номера на Госуслугах",
  card: "Предлагаем подтвердить номера из списка, используя свои персональные данные. Обращаем Ваше внимание, что возможна блокировка указанного/-ных номера/-ов до подтверждения на портале Госуслуги",
  buttonStartConfirmation: "Начать подтверждение",
  tableNames: {
    not_required: "Подтверждённые",
    requested: "В процессе подтверждения",
    required: "Требующие подтверждения",
  },
};

const getNumbersByStatus = (status: TGUConfimationStatusId, numbers: IGroupNumber[]): IGroupNumber[] => {
  return numbers.filter((number) => number.guConfirmationInfo.status.id === status);
};

const GosuslugiNumbersPage: FC = () => {
  const { data, loading, error } = useQuery(GET_GU_DATA);
  const navigate = useNavigate();

  const groups = data?.me?.account?.number?.groups;

  const allNumbers = groups?.flatMap((group: IGroup): IGroupNumber[] => {
    return group.numbers.map((number: IGroupNumber) => {
      return {
        msisdn: number.msisdn,
        guConfirmationInfo: number.guConfirmationInfo,
        mark: number.mark,
      };
    });
  });

  if (loading || !data) {
    return <Loader />;
  }
  return (
    <div className="mb-[40px] h-full w-full px-[40px] pt-[40px]">
      <PageTitle title={staticTexts.title} />
      {getNumbersByStatus("REQUIRED", allNumbers).length > 0 && (
        <Card style="">
          <div className="flex justify-between py-[10px]">
            <div className="w-[650px] text-[14px]">{staticTexts.card}</div>
            <div className="flex w-[189px] justify-stretch">
              <Button
                buttonType="default"
                title={staticTexts.buttonStartConfirmation}
                onClickCb={() => navigate(mainRoutes.gosuslugiAbout)}
              />
            </div>
          </div>
        </Card>
      )}

      <TableGosuslugi
        key={"NOT_REQUIRED"}
        tableName={staticTexts.tableNames.not_required}
        tableItem={getNumbersByStatus("NOT_REQUIRED", allNumbers)}
      />
      <TableGosuslugi
        key={"REQUESTED"}
        tableName={staticTexts.tableNames.requested}
        tableItem={getNumbersByStatus("REQUESTED", allNumbers)}
      />
      <TableGosuslugi
        key={"REQUIRED"}
        tableName={staticTexts.tableNames.required}
        tableItem={getNumbersByStatus("REQUIRED", allNumbers)}
      />
    </div>
  );
};

export default GosuslugiNumbersPage;
