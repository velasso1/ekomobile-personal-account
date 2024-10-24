import { FC, useState } from "react";

import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_GU_DATA } from "../../../api/apollo/queries/get-gu_data";
import Loader from "../../ui/loader/loader";
import { ICLient, IGroup, IGroupNumber } from "../../../types/gu-types";
import PrevNextButtons from "../../ui/prev-next-buttons/prev-next-buttons";
import { mainRoutes } from "../../../utils/routes-name/main-routes";
import { RadioInput } from "../../ui/radio-input";

const staticTexts = {
  title: "Подтверждение номера на Госуслугах",
  card: "Для подтверждения номера(ов) Вы можете использовать следующих контрагентов:",
  newClient: {
    id: "createNewClient",
    label: "Создать нового контрагента",
  },
};

const GosuslugiConfirmationPage: FC = () => {
  const { data, loading, error } = useQuery(GET_GU_DATA);
  const [clientId, setClientId] = useState("");
  const navigate = useNavigate();

  const groups = data?.me?.account?.number?.groups;

  const allClients = groups?.flatMap((group: IGroup): ICLient[] => {
    return group.numbers
      .map((number: IGroupNumber) => {
        const client = number.guConfirmationInfo.client;
        if (client) {
          return {
            id: client.id,
            nameFamily: client.nameFamily,
            nameGiven: client.nameGiven,
            namePatronymic: client.namePatronymic,
            guConfirmationCount: client.guConfirmationCount,
            guConfirmationLimit: client.guConfirmationLimit,
          };
        }
        return null;
      })
      .filter((client: ICLient) => client !== null);
  });

  if (loading || !data) {
    return <Loader />;
  }
  return (
    <div className="mb-[40px] h-full w-full px-[40px] pt-[40px]">
      <PageTitle title={staticTexts.title} />
      {1 > 0 && (
        <Card style="">
          <div className="py-[10px]">
            <div className="w-[650px] text-[18px] font-semibold">{staticTexts.card}</div>

            <div className="radio-list flex flex-col pt-2">
              {allClients.map((client: ICLient) => (
                <RadioInput
                  key={client.id}
                  id={client.id}
                  isChecked={clientId === client.id}
                  label={`${client.nameFamily} ${client.nameGiven} ${client.namePatronymic}`}
                  onChange={() => setClientId(client.id)}
                />
              ))}
              <RadioInput
                id={staticTexts.newClient.id}
                isChecked={clientId === staticTexts.newClient.id}
                label={staticTexts.newClient.label}
                onChange={() => setClientId(staticTexts.newClient.id)}
              />
            </div>
          </div>

          <div className="pt-8">
            <PrevNextButtons nextRoute={mainRoutes.gosuslugiConfirmation} />
          </div>
        </Card>
      )}
    </div>
  );
};

export default GosuslugiConfirmationPage;
