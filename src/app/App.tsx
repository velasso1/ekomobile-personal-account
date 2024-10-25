import { FC, useEffect, useLayoutEffect, Suspense } from "react";
import KTComponent from "../metronic/core/index.ts";
import KTLayout from "../metronic/app/layouts/demo1.js";
import "../index.css";

import { useLocation, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { CHECK_AUTH_USER } from "./api/apollo/queries/refresh-session.ts";
import { ICheckUserAuth } from "./api/apollo/queries/refresh-session.ts";

import Loader from "./modules/ui/loader/loader.tsx";

// import modules
import AuthModule from "./modules/auth/auth-module.tsx";
import MainModule from "./modules/main/main-module.tsx";

import { useAppSelector, useAppDispatch } from "./store/index.ts";
import { requestIsLoading, checkAccStatusOnSignIn, setChecking } from "./store/slices/auth-slice.ts";

import PrivateRoute from "./utils/private-route/private-route.tsx";
import { authRoutes, mainRoutes } from "./utils/routes-name/main-routes.ts";

const App: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { accIsAuth, isLoading, loginRequestSend, checking } = useAppSelector((state) => state.routeSlice);

  const { data, loading, error, refetch } = useQuery<ICheckUserAuth>(CHECK_AUTH_USER);

  useEffect(() => {
    KTComponent.init();
    KTLayout.init();
  }, []);

  useEffect(() => {
    if (data && data.me) {
      dispatch(setChecking(true));
      localStorage.setItem("UDATA", `${data.me.account.email}`);
      dispatch(checkAccStatusOnSignIn());
      return;
    }

    refetch();
  }, [data, loginRequestSend]);

  useEffect(() => {
    KTComponent.init();
    KTLayout.init();
  }, [location]);

  return (
    <Routes>
      <Route path="main/*" element={<PrivateRoute children={<MainModule />} />} />
      <Route path="auth/*" element={<AuthModule />} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default App;
