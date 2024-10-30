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
    updateConfirmationPassportRG(state, action: PayloadAction<IGURequestConfirmationPassportRFParams>) {
      state.confirmationPassportRF = action.payload;
    },
  },
});

export const { updateConfirmationPassportRG } = gosuslugiSlice.actions;
export default gosuslugiSlice.reducer;
