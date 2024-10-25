import { FC } from "react";

import { Navigate } from "react-router-dom";

import { authRoutes, mainRoutes } from "../routes-name/main-routes";

import { useAppSelector } from "../../store";

interface IPrivateRouteProps {
  children: React.ReactNode;
  authChecking?: boolean;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({ children, authChecking = false }) => {
  const { accIsAuth } = useAppSelector((state) => state.routeSlice);

  if (authChecking) {
    return accIsAuth ? <Navigate to={mainRoutes.main} /> : children;
  }

  return accIsAuth ? children : <Navigate to={authRoutes.login} />;
};

export default PrivateRoute;
