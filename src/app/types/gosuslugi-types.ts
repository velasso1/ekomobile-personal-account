export type TGUConfimationStatusId = "REQUIRED" | "NOT_REQUIRED" | "REQUESTED";
// названия компонентов, которые используются для управления состоянием отображения нужного компонента для подтверждения ГУ
export type TGUConfirmationCards = "choose-client" | "choose-numbers" | "create-client-fio" | "create-client-passport";
export type TGUConfirmationClientGender = "MALE" | "FEMALE";

export interface IGUConfirmationStatus {
  name: string;
  id: TGUConfimationStatusId;
}

export interface ICLient {
  id: string;
  nameFamily: string;
  nameGiven: string;
  namePatronymic: string;
  guConfirmationLimit: number;
  guConfirmationCount: number;
}

export interface IGroupNumber {
  msisdn: string;
  guConfirmationInfo: {
    status: IGUConfirmationStatus;
    client?: ICLient;
  };
  mark: {
    name: string;
  };
}

export interface IGroup {
  numbers: IGroupNumber[];
}

export interface IGUInfo {
  info: {
    guConfirmation: IGUConfrirmation;
  };
}

export interface IGUHints {
  confirmationNeeded: string;
  confirmationNotNeeded: string;
  confirmationRequested: string;
}

export interface IGUConfrirmation {
  aboutConfirmation: string;
  hints: IGUHints;
  pdAgreement: string;
  requestReady: string;
  requestSent: string;
}

export interface IGURequestConfirmationPassportRFParams {
  // Номер телефона в формате 10 цифр
  targetMsisdn: string;
  passportRF: {
    series: string;
    registrationAddress: string;
    number: string;
    namePatronymic: string;
    nameGiven: string;
    nameFamily: string;
    issuePlaceCode: string;
    issuePlace: string;
    //Локальная дата в формате 2021-09-26
    issueDate: string;
    gender: TGUConfirmationClientGender | "";
    birthplace: string;
    // Локальная дата в формате 2021-09-26
    birthdate: string;
  };
}

export interface IGUConfirmationPassportField {
  label: string;
  placeholder?: string;
  id: keyof IGURequestConfirmationPassportRFParams["passportRF"];
  type: "text" | "date" | "radio";
  options?: {
    text: string;
    value: string;
  }[];
}

export type TFormikClientFio = Pick<
  IGURequestConfirmationPassportRFParams["passportRF"],
  "birthdate" | "birthplace" | "gender" | "nameFamily" | "nameGiven" | "namePatronymic"
>;
