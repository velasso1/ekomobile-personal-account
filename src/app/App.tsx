import { FC, useEffect } from "react";
import KTComponent from "../metronic/core/index.ts";
import KTLayout from "../metronic/app/layouts/demo1.js";
import "../index.css";

// import modules
import AuthModule from "./modules/auth/auth-module.tsx";
import MainModule from "./modules/main/main-module.tsx";

import { useLocation, Routes, Route, Navigate } from "react-router-dom";

const App: FC = () => {
  const location = useLocation();
  useEffect(() => {
    KTComponent.init();
    KTLayout.init();
  }, []);

  useEffect(() => {
    KTComponent.init();
    KTLayout.init();
  }, [location]);
  return (
    <Routes>
      <Route path="main/*" element={<MainModule />} />
      <Route path="auth/*" element={<AuthModule />} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default App;
