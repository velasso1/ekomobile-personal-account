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

const staticTexts = {
  title: "Подтверждение номера на Госуслугах",
};

const GosuslugiConfirmationPage: FC = () => {
  const [GUCard, setGUCard] = useState<TGUConfirmationCards>("choose-client");
  const { data, loading } = useGetGosuslugiData();

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
        </Card>
      )}
    </div>
  );
};

export default GosuslugiConfirmationPage;
