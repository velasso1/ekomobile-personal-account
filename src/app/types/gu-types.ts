export type TGUConfimationStatusId = "REQUIRED" | "NOT_REQUIRED" | "REQUESTED";

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
