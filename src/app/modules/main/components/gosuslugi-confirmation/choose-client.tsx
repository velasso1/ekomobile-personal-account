import { useState } from "react";
import { ICLient, TGUConfirmationCards } from "../../../../types/gosuslugi-types";
import { RadioInput } from "../../../ui/radio-input";
import PrevNextButtons from "../../../ui/prev-next-buttons/prev-next-buttons";
import useGetGosuslugiData from "../../../../hooks/useGetGosuslugiData";

interface IProps {
  setGUCard: React.Dispatch<React.SetStateAction<TGUConfirmationCards>>;
}

const staticTexts = {
  card: "Для подтверждения номера(ов) Вы можете использовать следующих контрагентов:",
  newClient: {
    id: "createNewClient",
    label: "Создать нового контрагента",
  },
};

const ChooseClient = ({ setGUCard }: IProps) => {
  const [clientId, setClientId] = useState("");

  const { allClients } = useGetGosuslugiData();

  return (
    <>
      <div>
        <div className="w-[650px] text-[18px] font-semibold">{staticTexts.card}</div>

        <div className="radio-list flex flex-col pt-7">
          {allClients.map((client: ICLient, index: number) => (
            <RadioInput
              key={client.id}
              isFirst={index === 0}
              name={client.id}
              value={client.id}
              isChecked={clientId === client.id}
              label={`${client.nameFamily} ${client.nameGiven} ${client.namePatronymic}`}
              onChange={() => setClientId(client.id)}
            />
          ))}
          <RadioInput
            name={staticTexts.newClient.id}
            value={staticTexts.newClient.id}
            isChecked={clientId === staticTexts.newClient.id}
            label={staticTexts.newClient.label}
            onChange={() => setClientId(staticTexts.newClient.id)}
          />
        </div>

        <div className="pt-8">
          <PrevNextButtons
            nextDisabled={clientId === ""}
            nextClick={() => {
              if (clientId === staticTexts.newClient.id) {
                setGUCard("create-client-fio");
              } else {
                setGUCard("choose-numbers");
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ChooseClient;
