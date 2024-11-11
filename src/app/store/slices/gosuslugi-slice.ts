import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGURequestConfirmationPassportRFParams, ISSUE_PLACE_MANUAL } from "../../types/gosuslugi-types";

type TInitGUSlice = {
  passportRF: {
    [ISSUE_PLACE_MANUAL]: string;
  } & IGURequestConfirmationPassportRFParams["passportRF"];
};

const initialState: TInitGUSlice = {
  passportRF: {
    birthdate: "",
    birthplace: "",
    gender: "",
    issueDate: "",
    issuePlace: "",
    issuePlaceManual: "",
    issuePlaceCode: "",
    nameFamily: "",
    nameGiven: "",
    namePatronymic: "",
    number: "",
    registrationAddress: "",
    series: "",
  },
};

const gosuslugiSlice = createSlice({
  name: "gosuslugiSlice",
  initialState,
  reducers: {
    updateConfirmationPassportRF(state, action: PayloadAction<Partial<TInitGUSlice>>) {
      state.passportRF = {
        ...state.passportRF,
        ...action.payload,
      };
    },
  },
});

export const { updateConfirmationPassportRF } = gosuslugiSlice.actions;
export default gosuslugiSlice.reducer;
