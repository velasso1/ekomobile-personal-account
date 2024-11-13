import { ICLient, TGUConfirmationCards } from "../../../../types/gosuslugi-types";
import { RadioInput } from "../../../ui/radio-input";
import PrevNextButtons from "../../../ui/prev-next-buttons/prev-next-buttons";
import useGetGosuslugiData from "../../../../hooks/useGetGosuslugiData";
import { CREATE_NEW_CLIENT_ID, updateClientId, updateNumbers } from "../../../../store/slices/gosuslugi-slice";
import { useAppDispatch, useAppSelector } from "../../../../store";

interface IProps {
  setGUCard: React.Dispatch<React.SetStateAction<TGUConfirmationCards>>;
}

const staticTexts = {
  card: "Для подтверждения номера(ов) Вы можете использовать следующих контрагентов:",
  newClient: {
    id: CREATE_NEW_CLIENT_ID,
    label: "Создать нового контрагента",
  },
};

const ChooseClient = ({ setGUCard }: IProps) => {
  const { allClients, conformationRequiredNumbers } = useGetGosuslugiData();
  const dispatch = useAppDispatch();
  const { clientId } = useAppSelector((state) => state.gosuslugiSlice);

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
              onChange={() => dispatch(updateClientId(client.id))}
            />
          ))}
          <RadioInput
            name={staticTexts.newClient.id}
            value={staticTexts.newClient.id}
            isChecked={clientId === staticTexts.newClient.id}
            label={staticTexts.newClient.label}
            onChange={() => dispatch(updateClientId(staticTexts.newClient.id))}
          />
        </div>

        <div className="pt-8">
          <PrevNextButtons
            nextDisabled={clientId === ""}
            nextClick={() => {
              if (clientId === staticTexts.newClient.id) {
                setGUCard("create-client-fio");
              } else if (conformationRequiredNumbers.length === 1) {
                dispatch(updateNumbers({ checked: true, affectedNumber: conformationRequiredNumbers[0].msisdn }));
                setGUCard("data-preview");
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
