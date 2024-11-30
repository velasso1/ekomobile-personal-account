import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProfileInfo } from "../../types/profile-info-types";
import { ICurrentDataResponse } from "../../types/new-current-data-types";

interface IInitUserSlice {
  userInfo: IProfileInfo;
  selectedNumber: string;
  // change this types later
  newCurrentData: ICurrentDataResponse | "";
  servicesChecked: "ENABLED" | "DISABLED";
}

const initialState: IInitUserSlice = {
  userInfo: {
    fullName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    sex: "NOTSELECTED",
  },
  selectedNumber: "",
  newCurrentData: "",
  servicesChecked: "ENABLED",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    putUserInfo(state, action: PayloadAction<IProfileInfo>) {
      state.userInfo = action.payload;
      state.selectedNumber = action.payload.phoneNumber;
    },

    changeSelectedNumber(state, action: PayloadAction<string>) {
      state.selectedNumber = action.payload;
    },

    newDataReceived(state, action: PayloadAction<ICurrentDataResponse>) {
      state.newCurrentData = action.payload;
    },
    changeSelectOption(state, action: PayloadAction<"ENABLED" | "DISABLED">) {
      state.servicesChecked = action.payload;
    },

    resetUserSliceState() {
      return initialState;
    },
  },
});

export const { putUserInfo, changeSelectedNumber, newDataReceived, changeSelectOption, resetUserSliceState } =
  userSlice.actions;
export default userSlice.reducer;
