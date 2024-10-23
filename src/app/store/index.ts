import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import authSlice from "./slices/auth-slice";
import userSlice from "./slices/user-slice";

const rootReducer = combineReducers({
  routeSlice: authSlice,
  userSlice: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
