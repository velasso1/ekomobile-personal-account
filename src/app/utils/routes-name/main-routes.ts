import { IMainRoutes, IAuthRoutes } from "../../types/routes-types";

export const mainRoutes: IMainRoutes = {
  main: "/main/main",
  numbers: "/main/numbers",
  services: "/main/services",
  expenses: "/main/expenses",
  details: "/main/details",
  remainder: "/main/remainder",
  balance: "/main/balance",
  applications: "/main/applications",
  profile: "/main/profile",
};

export const authRoutes: IAuthRoutes = {
  login: "/auth/login",
  registration: "/auth/registration",
  recovery: "/auth/recovery-pass",
  recoverySuccess: "/auth/recovery-success",
};
