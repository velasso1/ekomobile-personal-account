import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "..";

import { TUserState } from "../../types/login-state-types";

interface IAuthSliceState {
  authData: string;
  accIsAuth: boolean;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IAuthSliceState = {
  authData: "",
  accIsAuth: false,
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authDataReceived(state, action: PayloadAction<string>) {
      state.authData = action.payload;
    },

    checkAccStatus(state) {
      const token = localStorage.getItem("token");

      // if (token === "null") {
      //   state.isError = true;
      //   return;
      // }

      state.accIsAuth = !!token && token !== "null";
      state.isLoading = false;
      state.isError = false;
    },

    requestIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    requestError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

// Actions

export const signIn = (body: TUserState) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(requestIsLoading(true));
    try {
      await fetch(`${import.meta.env.VITE_AUTH_REST_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Auth-Client-Key": `${import.meta.env.VITE_TEMP_TOKEN}`,
        },
        body: new URLSearchParams(body).toString(),
      }).then((resp) => {
        localStorage.setItem("token", resp.headers.get("X-Auth-Token"));
        dispatch(checkAccStatus());
      });
    } catch (error) {
      dispatch(requestError(true));
      console.error(error);
    }
  };
};

export const logOut = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      await fetch(`${import.meta.env.VITE_LOGOUT_REST_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Auth-Client-Key": `${import.meta.env.VITE_TEMP_TOKEN}`,
        },
      }).then((resp) => {
        localStorage.removeItem("token");
        dispatch(checkAccStatus());
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const { authDataReceived, checkAccStatus, requestIsLoading, requestError } = authSlice.actions;
export default authSlice.reducer;
