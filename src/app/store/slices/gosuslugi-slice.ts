import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGURequestConfirmationPassportRFParams, ISSUE_PLACE_MANUAL } from "../../types/gosuslugi-types";

type TInitGUSlice = {
  passportRF: {
    [ISSUE_PLACE_MANUAL]: string;
  } & IGURequestConfirmationPassportRFParams["passportRF"];
  numbers: string[];
};

interface IUpdateNumbersPayload {
  checked: boolean;
  affectedNumber: string;
}

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
  numbers: [],
};

const gosuslugiSlice = createSlice({
  name: "gosuslugiSlice",
  initialState,
  reducers: {
    updatePassportRF(state, action: PayloadAction<Partial<TInitGUSlice>>) {
      state.passportRF = {
        ...state.passportRF,
        ...action.payload,
      };
    },
    updateNumbers(state, action: PayloadAction<IUpdateNumbersPayload>) {
      const { checked, affectedNumber } = action.payload;
      if (checked) {
        state.numbers = [...state.numbers, affectedNumber];
      } else {
        state.numbers = state.numbers.filter((number) => number !== affectedNumber);
      }
    },
  },
});

export const { updatePassportRF, updateNumbers } = gosuslugiSlice.actions;
export default gosuslugiSlice.reducer;
