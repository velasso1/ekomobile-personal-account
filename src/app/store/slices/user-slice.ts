import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfileInfo } from "../../types/profile-info-types";

interface IInitUserSlice {
  userInfo: IProfileInfo;
  selectedNumber: string;
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
  },
});

export const { putUserInfo, changeSelectedNumber } = userSlice.actions;
export default userSlice.reducer;
