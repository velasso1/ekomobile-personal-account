import { TGUConfirmationCards } from "../../../../types/gosuslugi-types";
import PrevNextButtons from "../../../ui/prev-next-buttons/prev-next-buttons";
import { mainRoutes } from "../../../../utils/routes-name/main-routes";

interface IProps {
  setGUCard: React.Dispatch<React.SetStateAction<TGUConfirmationCards>>;
}

const staticTexts = {
  card: "Выберите номер(а) для подтвержденияЖ",
  newClient: {
    id: "createNewClient",
    label: "Создать нового контрагента",
  },
};

const ChooseNumbers = ({ setGUCard }: IProps) => {
  return (
    <>
      <div>
        <div className="w-[650px] text-[18px] font-semibold">{staticTexts.card}</div>

        <div className="radio-list flex flex-col pt-2"></div>
      </div>

      <div className="pt-8">
        <PrevNextButtons nextRoute={mainRoutes.gosuslugiConfirmation} />
      </div>
    </>
  );
};

export default ChooseNumbers;
