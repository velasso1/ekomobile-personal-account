import { FC, useState } from "react";

import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Loader from "../../ui/loader/loader";
import { ICLient, IGroup, IGroupNumber, TGUConfirmationCards } from "../../../types/gosuslugi-types";
import ChooseClient from "../../main/components/gosuslugi-confirmation/choose-client";
import ChooseNumbers from "../../main/components/gosuslugi-confirmation/choose-numbers";
import CreateClientFio from "../../main/components/gosuslugi-confirmation/create-client-fio";
import CreateClientPassport from "../../main/components/gosuslugi-confirmation/create-client-passport";
import { GET_GOSUSLUGI_DATA } from "../../../api/apollo/queries/get-gosuslugi-data";

const staticTexts = {
  title: "Подтверждение номера на Госуслугах",
};

const GosuslugiConfirmationPage: FC = () => {
  const { data, loading, error } = useQuery(GET_GOSUSLUGI_DATA);
  const navigate = useNavigate();
  const [GUCard, setGUCard] = useState<TGUConfirmationCards>("choose-client");

  const groups: IGroup[] = data?.me?.account?.number?.groups;
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

  const showCard = (cardNow: TGUConfirmationCards) => {
    switch (cardNow) {
      case "choose-client":
        return <ChooseClient clients={allClients} setGUCard={setGUCard} />;

      case "choose-numbers":
        return <ChooseNumbers groups={groups} />;

      case "create-client-fio":
        return <CreateClientFio groups={groups} setGUCard={setGUCard} />;

      case "create-client-passport":
        return <CreateClientPassport groups={groups} />;
    }
  };

  if (loading || !data) {
    return <Loader />;
  }
  return (
    <div className="mb-[40px] h-full w-full px-[40px] pt-[40px]">
      <PageTitle title={staticTexts.title} />
      {1 > 0 && (
        <Card>
          <div
          // className="px-[10px] py-[20px]"
          >
            {showCard(GUCard)}
          </div>
          {/* <div className="pt-8">
            <PrevNextButtons nextRoute={mainRoutes.gosuslugiConfirmation} />
          </div> */}
        </Card>
      )}
    </div>
  );
};

export default GosuslugiConfirmationPage;
