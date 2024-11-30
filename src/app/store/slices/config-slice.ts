import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import { IConfig } from "../../types/config-types";

import yaml from "js-yaml";

const initialState: IConfig = {
  api: {
    url: "",
    authKey: "",
  },

  indexPage: {
    favicon: "",
    title: "",
  },

  logo: {
    url: "",
    style: {
      width: 0,
      height: 0,
    },
  },
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    configReceived(state, action: PayloadAction<IConfig>) {
      state.api = action.payload.api;
    },
  },
});

// Actions

export const getConfig = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response = await fetch("/config.yml");

      const yamlText = await response.text();

      dispatch(configReceived(yaml.load(yamlText)));
    } catch (error) {
      console.error(error);
    }
  };
};

export const { configReceived } = configSlice.actions;
export default configSlice.reducer;
