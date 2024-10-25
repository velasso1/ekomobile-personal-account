import { useState } from "react";
import { ICLient, IGroup, IGroupNumber } from "../../../../types/gu-types";
import { RadioInput } from "../../../ui/radio-input";
import PrevNextButtons from "../../../ui/prev-next-buttons/prev-next-buttons";
import { mainRoutes } from "../../../../utils/routes-name/main-routes";

interface IProps {
  groups: IGroup[];
}

const staticTexts = {
  card: "Паспортные данные:",
  newClient: {
    id: "createNewClient",
    label: "Создать нового контрагента",
  },
};

const CreateClientPassport = ({ groups }: IProps) => {
  const [clientId, setClientId] = useState("");
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

  return (
    <>
      <div>
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
    </>
  );
};

export default CreateClientPassport;
