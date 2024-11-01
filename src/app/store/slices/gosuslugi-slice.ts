import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGURequestConfirmationPassportRFParams } from "../../types/gosuslugi-types";

interface IInitGUSlice {
  confirmationPassportRF: IGURequestConfirmationPassportRFParams;
}

const initialState: IInitGUSlice = {
  confirmationPassportRF: {
    passportRF: {
      birthdate: "",
      birthplace: "",
      gender: "",
      issueDate: "",
      issuePlace: "",
      issuePlaceCode: "",
      nameFamily: "",
      nameGiven: "",
      namePatronymic: "",
      number: "",
      registrationAddress: "",
      series: "",
    },
    targetMsisdn: "",
  },
};

const gosuslugiSlice = createSlice({
  name: "gosuslugiSlice",
  initialState,
  reducers: {
    updateConfirmationPassportRF(
      state,
      action: PayloadAction<Partial<Pick<IGURequestConfirmationPassportRFParams, "passportRF">>>
    ) {
      state.confirmationPassportRF.passportRF = {
        ...state.confirmationPassportRF.passportRF,
        ...action.payload.passportRF,
      };
    },
  },
});

export const { updateConfirmationPassportRF } = gosuslugiSlice.actions;
export default gosuslugiSlice.reducer;
