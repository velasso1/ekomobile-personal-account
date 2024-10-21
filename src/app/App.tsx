import { FC, useEffect } from "react";
import KTComponent from "../metronic/core/index.ts";
import KTLayout from "../metronic/app/layouts/demo1.js";
import "../index.css";

import { useLocation, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// import modules
import AuthModule from "./modules/auth/auth-module.tsx";
import MainModule from "./modules/main/main-module.tsx";

import { useAppSelector, useAppDispatch } from "./store/index.ts";
import { checkAccStatus } from "./store/slices/auth-slice.ts";

import PrivateRoute from "./utils/private-route/private-route.tsx";
import { mainRoutes } from "./utils/routes-name/main-routes.ts";

const App: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accIsAuth } = useAppSelector((state) => state.routeSlice);
  useEffect(() => {
    KTComponent.init();
    KTLayout.init();
  }, []);

  useEffect(() => {
    KTComponent.init();
    KTLayout.init();
  }, [location]);

  useEffect(() => {
    dispatch(checkAccStatus());

    if (accIsAuth) {
      navigate(location.pathname === "/auth/login" ? mainRoutes.main : location.pathname);
    }
  }, [accIsAuth]);

  return (
    <Routes>
      <Route path="main/*" element={<PrivateRoute children={<MainModule />} />} />
      <Route path="auth/*" element={<AuthModule />} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default App;
