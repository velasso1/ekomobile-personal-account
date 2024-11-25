import { TGUConfirmationCards } from "../../../../types/gosuslugi-types";
import PrevNextButtons from "../../../ui/prev-next-buttons/prev-next-buttons";
import useGetGosuslugiData from "../../../../hooks/useGetGosuslugiData";
import CheckboxInput from "../../../ui/checkbox-input/checkbox-input";
import beautifyNumber from "../../../../utils/helpers/beautifyNumber";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { CREATE_NEW_CLIENT_ID, updateNumbers } from "../../../../store/slices/gosuslugi-slice";
import { defaultStyles } from "../../../../utils/default-styles";
import { NumberMarkName } from "../../../ui/number-mark-name";

interface IProps {
  setGUCard: React.Dispatch<React.SetStateAction<TGUConfirmationCards>>;
}

const staticTexts = {
  card: "Выберите номер(а) для подтверждения",
};

const ChooseNumbers = ({ setGUCard }: IProps) => {
  const { conformationRequiredNumbers } = useGetGosuslugiData();
  const { numbers, clientId } = useAppSelector((state) => state.gosuslugiSlice);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <div className="w-[650px] text-[18px] font-semibold">{staticTexts.card}</div>
        <div className="flex flex-col pt-[20px]">
          {conformationRequiredNumbers.map((number) => (
            <div key={number.msisdn} className="pt-4">
              <CheckboxInput
                id={number.msisdn}
                isChecked={numbers.includes(number.msisdn)}
                label={
                  <div className={`${defaultStyles.textSize.p14}`}>
                    {`${beautifyNumber(number.msisdn)}`}
                    <NumberMarkName numberMarkName={number.mark.name} />
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
        </div>
      </div>

      <div className="pt-8">
        <PrevNextButtons
          prevClick={() => {
            if (clientId === CREATE_NEW_CLIENT_ID) {
              setGUCard("create-client-passport");
            } else {
              setGUCard("choose-client");
            }
          }}
          nextDisabled={numbers.length < 1}
          nextClick={() => setGUCard("data-preview")}
        />
      </div>
    </>
  );
};

export default ChooseNumbers;
