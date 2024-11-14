<<<<<<< HEAD
import { useState } from "react";
import { ICLient, IGroup, IGroupNumber } from "../../../../types/gosuslugi-types";
import { RadioInput } from "../../../ui/radio-input";
import PrevNextButtons from "../../../ui/prev-next-buttons/prev-next-buttons";
import { mainRoutes } from "../../../../utils/routes-name/main-routes";

interface IProps {
  groups: IGroup[];
}

const staticTexts = {
  card: "Выберите номер(а) для подтвержденияЖ",
  newClient: {
    id: "createNewClient",
    label: "Создать нового контрагента",
  },
};

const ChooseNumbers = ({ groups }: IProps) => {
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
=======
import { TGUConfirmationCards } from "../../../../types/gosuslugi-types";
import PrevNextButtons from "../../../ui/prev-next-buttons/prev-next-buttons";
import { mainRoutes } from "../../../../utils/routes-name/main-routes";
import useGetGosuslugiData from "../../../../hooks/useGetGosuslugiData";
import CheckboxInput from "../../../ui/checkbox-input/checkbox-input";
import beautifyNumber from "../../../../utils/helpers/beautifyNumber";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { updateNumbers } from "../../../../store/slices/gosuslugi-slice";
import { defaultStyles } from "../../../../utils/default-styles";

interface IProps {
  setGUCard: React.Dispatch<React.SetStateAction<TGUConfirmationCards>>;
}

const staticTexts = {
  card: "Выберите номер(а) для подтверждения",
};

const ChooseNumbers = ({ setGUCard }: IProps) => {
  const { conformationRequiredNumbers } = useGetGosuslugiData();
  const { numbers } = useAppSelector((state) => state.gosuslugiSlice);
  const dispatch = useAppDispatch();
>>>>>>> stage

  return (
    <>
      <div>
        <div className="w-[650px] text-[18px] font-semibold">{staticTexts.card}</div>
<<<<<<< HEAD

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
=======
        <div className="flex flex-col pt-[20px]">
          {conformationRequiredNumbers.map((number) => (
            <div key={number.msisdn} className="pt-4">
              <CheckboxInput
                id={number.msisdn}
                isChecked={numbers.includes(number.msisdn)}
                label={
                  <div className={`${defaultStyles.textSize.p14}`}>
                    {`${beautifyNumber(number.msisdn)}`}
                    <span
                      className={`ml-2 text-[12px] ${defaultStyles.textColor.lightGrey}`}
                    >{`(${number.mark.name})`}</span>
                  </div>
                }
                onChange={(e) => {
                  const { checked, id } = e.target;
                  dispatch(updateNumbers({ checked, affectedNumber: id }));
                }}
                isMakdownText
              />
            </div>
          ))}
>>>>>>> stage
        </div>
      </div>

      <div className="pt-8">
<<<<<<< HEAD
        <PrevNextButtons nextRoute={mainRoutes.gosuslugiConfirmation} />
=======
        <PrevNextButtons
          nextRoute={mainRoutes.gosuslugiConfirmation}
          prevClick={() => setGUCard("create-client-passport")}
          nextDisabled={numbers.length < 1}
        />
>>>>>>> stage
      </div>
    </>
  );
};

export default ChooseNumbers;
