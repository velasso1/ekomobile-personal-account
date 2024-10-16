import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "..";

import { TUserState } from "../../modules/auth/components/login-form/login-form";

interface IAuthSliceState {
  authData: string;
  accIsAuth: boolean;
}

const initialState: IAuthSliceState = {
  authData: "",
  accIsAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authDataReceived(state, action: PayloadAction<string>) {
      state.authData = action.payload;
    },

    changeAccStatus(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        localStorage.setItem("isAuth", "true");
      } else {
        localStorage.setItem("isAuth", "");
      }

      state.accIsAuth = !!localStorage.getItem("isAuth");
    },

    checkAccStatus(state) {
      state.accIsAuth = !!localStorage.getItem("isAuth");
    },
  },
});

// Actions

export const signIn = (body: TUserState) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    // temp auth func
    dispatch(changeAccStatus(true));
    dispatch(checkAccStatus());
    //
    try {
      await fetch(`${import.meta.env.VITE_AUTH_REST_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Auth-Client-Key": `${import.meta.env.VITE_TEMP_TOKEN}`,
        },
        body: new URLSearchParams(body).toString(),
      }).then((resp) => {
        console.log(resp.headers.get("X-Auth-Token"));
        localStorage.setItem("token", resp.headers.get("X-Auth-Token"));
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(changeAccStatus(false));
    try {
      await fetch(`${import.meta.env.VITE_LOGOUT_REST_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Auth-Client-Key": `${import.meta.env.VITE_TEMP_TOKEN}`,
        },
      }).then((resp) => console.log(resp));
    } catch (error) {
      console.error(error);
    }
  };
};

export const { authDataReceived, changeAccStatus, checkAccStatus } = authSlice.actions;
export default authSlice.reducer;
