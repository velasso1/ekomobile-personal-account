import { useAppSelector } from "../../../../store";
import { ISSUE_PLACE_MANUAL } from "../../../../types/gosuslugi-types";
import { defaultStyles } from "../../../../utils/default-styles";

interface IProps {
  containerClass?: string;
}
const staticTexts = {
  title: "Будут подтверждены на контрагента",
  birthdate: "Дата рождения:",
  birthplace: "Место рождения:",
  passport: "Паспорт РФ:",
  issueDate: "Выдан:",
  issuePlace: "Место выдачи:",
  issuePlaceCode: "Код подразделения:",
  registrationAddress: "Адрес регистрации (прописки):",
  gender: "Пол:",
};

const PreviewClientData = ({ containerClass }: IProps) => {
  const {
    passportRF: {
      birthdate,
      birthplace,
      gender,
      issueDate,
      issuePlace,
      issuePlaceCode,
      issuePlaceManual,
      nameFamily,
      nameGiven,
      namePatronymic,
      number,
      registrationAddress,
      series,
    },
  } = useAppSelector((state) => state.gosuslugiSlice);

  return (
    <div className={`${defaultStyles.textSize.p14} ${containerClass ? containerClass : ""}`}>
      {nameFamily && nameGiven && (
        <div className="font-semibold">{`${staticTexts.title} ${nameFamily} ${nameGiven} ${namePatronymic}`}</div>
      )}
      {gender && <div>{`${staticTexts.gender} ${gender}`}</div>}
      <div className="pt-4"></div>
      {birthdate && <div>{`${staticTexts.birthdate} ${birthdate}`}</div>}
      {birthplace && <div>{`${staticTexts.birthplace} ${birthplace}`}</div>}
      <div className="pt-4"></div>
      {series && number && <div>{`${staticTexts.passport} ${series} ${number}`}</div>}
      {issueDate && <div>{`${staticTexts.issueDate} ${issueDate}`}</div>}
      {issuePlace && issuePlace !== ISSUE_PLACE_MANUAL && <div>{`${staticTexts.issuePlace} ${issuePlace}`}</div>}
      {issuePlaceManual && issuePlace === ISSUE_PLACE_MANUAL && (
        <div>{`${staticTexts.issuePlace} ${issuePlaceManual}`}</div>
      )}
      {issuePlaceCode && <div>{`${staticTexts.issuePlaceCode} ${issuePlaceCode}`}</div>}
      <div className="pt-4"></div>
      {registrationAddress && <div>{`${staticTexts.registrationAddress} ${registrationAddress}`}</div>}
    </div>
  );
};

export default PreviewClientData;
