import { FC, useState } from "react";

import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";

import Loader from "../../ui/loader/loader";
import { TGUConfirmationCards } from "../../../types/gosuslugi-types";
import ChooseClient from "../../main/components/gosuslugi-confirmation/choose-client";
import ChooseNumbers from "../../main/components/gosuslugi-confirmation/choose-numbers";
import CreateClientFio from "../../main/components/gosuslugi-confirmation/create-client-fio";
import CreateClientPassport from "../../main/components/gosuslugi-confirmation/create-client-passport";
import useGetGosuslugiData from "../../../hooks/useGetGosuslugiData";
import DataPreview from "../../main/components/gosuslugi-confirmation/data-preview";
import DataSent from "../../main/components/gosuslugi-confirmation/data-sent";

const staticTexts = {
  title: "Подтверждение номера на Госуслугах",
};

const GosuslugiConfirmationPage: FC = () => {
  const { data, loading, allClients } = useGetGosuslugiData();
  const [GUCard, setGUCard] = useState<TGUConfirmationCards>(
    allClients.length > 0 ? "choose-client" : "create-client-fio"
  );

  const showCard = (cardNow: TGUConfirmationCards) => {
    switch (cardNow) {
      case "choose-client":
        return <ChooseClient setGUCard={setGUCard} />;

      case "choose-numbers":
        return <ChooseNumbers setGUCard={setGUCard} />;

      case "create-client-fio":
        return <CreateClientFio setGUCard={setGUCard} />;

      case "create-client-passport":
        return <CreateClientPassport setGUCard={setGUCard} />;

      case "data-preview":
        return <DataPreview setGUCard={setGUCard} />;

      case "data-sent":
        return <DataSent />;
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
          <div>{showCard(GUCard)}</div>
        </Card>
      )}
    </div>
  );
};

export default GosuslugiConfirmationPage;
