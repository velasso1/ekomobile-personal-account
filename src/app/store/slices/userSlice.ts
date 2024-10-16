import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfileInfo } from "../../types/profile-info-types";

interface IInitUserSlice {
  userInfo: IProfileInfo;
}

const initialState: IInitUserSlice = {
  userInfo: {
    fullName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    sex: "0",
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    putUserInfo(state, action: PayloadAction<IProfileInfo>) {
      state.userInfo = action.payload;
    },
  },
});

export const { putUserInfo } = userSlice.actions;
export default userSlice.reducer;
