import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "..";

import { TUserState } from "../../types/login-state-types";

interface IAuthSliceState {
  authData: string;
  accIsAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  loginRequestSend: boolean;
  checking: boolean;
}

const initialState: IAuthSliceState = {
  authData: "",
  accIsAuth: false,
  isLoading: false,
  isError: false,
  loginRequestSend: false,
  checking: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authDataReceived(state, action: PayloadAction<string>) {
      state.authData = action.payload;
    },

    checkAccStatusOnSignIn(state, action: PayloadAction<number>) {
      const email = localStorage.getItem("UDATA");

      state.accIsAuth = email !== null;
      state.isLoading = false;
      state.isError = false;
    },

    requestIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    requestError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    changeLoginRequest(state, action: PayloadAction<boolean>) {
      state.loginRequestSend = action.payload;
    },

    setChecking(state, action: PayloadAction<boolean>) {
      state.checking = action.payload;
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
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Auth-Client-Key": `${import.meta.env.VITE_TEMP_TOKEN}`,
        },
        body: new URLSearchParams({ username: body.username, password: body.password }).toString(),
      }).then((resp) => {
        dispatch(changeLoginRequest(resp.status === 200));
      });
    } catch (error) {
      dispatch(requestError(true));
      console.error(error);
    }
  };
};

export const logOut = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    localStorage.removeItem("UDATA");
    dispatch(checkAccStatusOnSignIn());
    try {
      await fetch(`${import.meta.env.VITE_LOGOUT_REST_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Auth-Client-Key": `${import.meta.env.VITE_TEMP_TOKEN}`,
        },
      }).then((resp) => {});
    } catch (error) {
      console.error(error);
    }
  };
};

export const {
  authDataReceived,
  checkAccStatusOnSignIn,
  requestIsLoading,
  requestError,
  changeLoginRequest,
  setChecking,
} = authSlice.actions;
export default authSlice.reducer;
