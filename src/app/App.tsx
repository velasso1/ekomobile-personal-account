import { FC, useEffect } from "react";
import KTComponent from "../metronic/core/index.ts";
import KTLayout from "../metronic/app/layouts/demo1.js";
import "../index.css";

import { useLocation, Routes, Route, Navigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { CHECK_AUTH_USER } from "./api/apollo/queries/refresh-session.ts";
import { ICheckUserAuth } from "./api/apollo/queries/refresh-session.ts";

import { useAppSelector, useAppDispatch } from "./store/index.ts";
import { checkAccStatusOnSignIn } from "./store/slices/auth-slice.ts";
import { changeSelectedNumber } from "./store/slices/user-slice.ts";

// import modules
import AuthModule from "./modules/auth/auth-module.tsx";
import MainModule from "./modules/main/main-module.tsx";

import PrivateRoute from "./utils/private-route/private-route.tsx";

import { getConfig } from "./store/slices/config-slice.ts";

const App: FC = () => {

  const { loginRequestSend } = useAppSelector((state) => state.routeSlice);
=======

  const { checking, loginRequestSend } = useAppSelector((state) => state.routeSlice);
>>>>>>> origin-2/main

  const { data, loading, error, refetch } = useQuery<ICheckUserAuth>(CHECK_AUTH_USER);

  useEffect(() => {
    KTComponent.init();
    KTLayout.init();
    dispatch(getConfig());
  }, []);

  useEffect(() => {
    KTComponent.init();
    KTLayout.init();
  }, [location]);

  useEffect(() => {
    if (data?.me) {
      localStorage.setItem("UDATA", `${data.me.account.email}`);
      dispatch(changeSelectedNumber(data.me.account.msisdn));
      dispatch(checkAccStatusOnSignIn());
      return;
    }

    refetch();
  }, [data, checking]);

  return (
    <Routes>
      <Route path="main/*" element={<PrivateRoute children={<MainModule />} />} />
      <Route path="auth/*" element={<AuthModule />} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default App;
