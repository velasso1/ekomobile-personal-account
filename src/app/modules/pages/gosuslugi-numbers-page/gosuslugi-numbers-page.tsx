import { FC } from "react";

import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import TableGosuslugi from "../../ui/tables/table-gosuslugi";

import { useNavigate } from "react-router-dom";
import { mainRoutes } from "../../../utils/routes-name/main-routes";

import Loader from "../../ui/loader/loader";
import { IGroupNumber, TGUConfimationStatusId } from "../../../types/gosuslugi-types";
import useGetGosuslugiData from "../../../hooks/useGetGosuslugiData";

const staticTexts = {
  title: "Подтверждение номера на Госуслугах",
  getCard: function (count: number) {
    return `Предлагаем подтвердить номера из списка, используя свои персональные данные. Обращаем Ваше внимание, что возможна блокировка ${count > 1 ? this.variables.numbers : this.variables.number} до подтверждения на портале Госуслуги`;
  },
  variables: {
    number: "указанного номера",
    numbers: "указанных номеров",
  },
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
  const { data, loading, allNumbers } = useGetGosuslugiData();
  const navigate = useNavigate();

  if (loading || !data) {
    return <Loader />;
  }
  return (
    <div className="mb-[40px] h-full w-full px-[40px] pt-[40px]">
      <PageTitle title={staticTexts.title} />
      {getNumbersByStatus("REQUIRED", allNumbers).length > 0 && (
        <Card>
          <div className="flex justify-between py-[10px]">
            <div className="w-[650px] text-[14px]">
              {staticTexts.getCard(getNumbersByStatus("REQUIRED", allNumbers).length)}
            </div>
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
