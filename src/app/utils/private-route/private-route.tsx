import { FC } from "react";

import { Navigate } from "react-router-dom";

import { authRoutes } from "../routes-name/main-routes";

import { useAppSelector } from "../../store";

interface IPrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({ children }) => {
  const { accIsAuth } = useAppSelector((state) => state.routeSlice);

  return accIsAuth ? children : <Navigate to={authRoutes.login} />;
};

export default PrivateRoute;
