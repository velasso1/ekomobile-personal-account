import { useState } from "react";
import useGetGosuslugiData from "../../../../hooks/useGetGosuslugiData";
import { useAppSelector } from "../../../../store";
import { CREATE_NEW_CLIENT_ID } from "../../../../store/slices/gosuslugi-slice";
import { TGUConfirmationCards } from "../../../../types/gosuslugi-types";
import { defaultStyles } from "../../../../utils/default-styles";
import beautifyNumber from "../../../../utils/helpers/beautifyNumber";
import CheckboxInput from "../../../ui/checkbox-input/checkbox-input";
import PrevNextButtons from "../../../ui/prev-next-buttons/prev-next-buttons";
import DataPreviewClient from "./data-preview-client";
import shieldCross from "../../../../assets/images/shield-cross.svg";
import useConfirmGosuslugiData from "../../../../hooks/useConfirmGosuslugiData";
import Loader from "../../../ui/loader/loader";
import { NumberMarkName } from "../../../ui/number-mark-name";
interface IProps {
  setGUCard: React.Dispatch<React.SetStateAction<TGUConfirmationCards>>;
}

const staticTexts = {
  card: "Мы готовы запустить процесс регистрации следующих номеров на Госуслугах.",
  cardSubtitile: "Пожалуйста, проверьте, что ввели все данные корректно.",
  numbers: "Номера",
  clientFio: "Будут подтверждены на контрагента",
  isDataCorrectLabel: "Подтверждаю корректность данных",
  warningTitle: "Обратите внимание",
  warningText: "На время проведения проверки данных указанные номера будут заблокированы",
};

const DataPreview = ({ setGUCard }: IProps) => {
  const { conformationRequiredNumbers, allClients } = useGetGosuslugiData();
  const { confirmNumbers, loadingClient, loadingPassport, dataClient, dataPassport, errorClient, errorPassport } =
    useConfirmGosuslugiData();
  const { numbers, clientId } = useAppSelector((state) => state.gosuslugiSlice);
  const currentClient = allClients?.find((client) => client.id === clientId);

  const [isDataCorrect, setIsDataCorrect] = useState(false);
  const getNumberName = (number: string) =>
    conformationRequiredNumbers.find((item) => item.msisdn === number)?.mark?.name;

  return (
    <>
      {(loadingClient || loadingPassport) && <Loader />}

      <div className="bg-opacity-5">
        <div className="w-[650px] text-[18px] font-semibold">{staticTexts.card}</div>
        <div className="w-[650px] text-[18px] font-semibold">{staticTexts.cardSubtitile}</div>
        <div className="pt-[20px]">
          <div className={`${defaultStyles.textSize.p14} font-semibold`}>
            {staticTexts.numbers}
            {numbers.map((number) => (
              <div key={number} className="pt-4">
                <div className={`${defaultStyles.textSize.p14}`}>
                  {`${beautifyNumber(number)}`}
                  <NumberMarkName numberMarkName={getNumberName(number)} />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8">
            {clientId === CREATE_NEW_CLIENT_ID ? (
              <DataPreviewClient />
            ) : (
              <div
                className={`${defaultStyles.textSize.p14} font-semibold`}
              >{`${staticTexts.clientFio} ${currentClient?.nameFamily} ${currentClient?.nameGiven} ${currentClient?.namePatronymic}`}</div>
            )}
          </div>

          <div className="pt-8">
            <CheckboxInput
              id="isDataCorrect"
              isChecked={isDataCorrect}
              label={staticTexts.isDataCorrectLabel}
              onChange={() => setIsDataCorrect(!isDataCorrect)}
            />
          </div>

          <div className="align-items-center mt-7 flex w-[650px] rounded-md border border-dashed border-[#F6B100] bg-[#FFF8DD] px-3 py-4">
            <div className="align-items-center mr-2 flex">
              <img src={shieldCross} alt="Внимание!" className="w-34" />
            </div>
            <div>
              <div className={`font-semibold ${defaultStyles.textSize.p14}`}>{staticTexts.warningTitle}</div>
              <div className={` ${defaultStyles.textColor.lightGrey} ${defaultStyles.textSize.p14}`}>
                {staticTexts.warningText}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <PrevNextButtons
          prevClick={() => {
            if (conformationRequiredNumbers.length === 1) {
              setGUCard("choose-client");
            } else {
              setGUCard("choose-numbers");
            }
          }}
          nextDisabled={!isDataCorrect}
          nextClick={async () => {
            await confirmNumbers();
            if (!loadingClient && !loadingPassport) {
              setGUCard("data-sent");
            }
          }}
        />
      </div>
    </>
  );
};

export default DataPreview;
