import { FC, useState, createContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import SideBar from "../sidebar/components/sidebar-module";

import { Header } from "../ui/header";
import { Footer } from "../ui/footer";

import { MainPage } from "../pages/main-page";
import { NumbersPage } from "../pages/numbers-page";
import { ServicesPage } from "../pages/services-page";
import { ExpensesPage } from "../pages/expenses-page";
import { DetailsPage } from "../pages/details-page";
import { RemainderPage } from "../pages/remainder-page";
import { BalancePage } from "../pages/balance-page";
import { ApplicationPage } from "../pages/application-page";
import { ProfilePage } from "../pages/profile-page";
import { GosuslugiNumbersPage } from "../pages/gosuslugi-numbers-page";
import { GosuslugiAboutPage } from "../pages/gosuslugi-about-page";
import { defaultStyles } from "../../utils/default-styles";

export const Context = createContext(null);

const MainModule: FC = () => {
  const { bgColor } = defaultStyles;
  const [sidePanelOpen, setPanelOpen] = useState<boolean>(false);
  return (
    <div
      className="grid h-full w-full grid-rows-layout grid-areas-layout md:grid-cols-layout"
      style={sidePanelOpen ? { overflowY: "hidden" } : null}
    >
      <div className="sidebar grid-in-nav">
        <Context.Provider value={sidePanelOpen}>
          <SideBar changeVis={setPanelOpen} />
        </Context.Provider>
      </div>
      <div className="header grid-in-header">
        <Header changeVis={setPanelOpen} />
      </div>

      <div className={`main-content ${bgColor.littleGrey} grid-in-main`}>
        <Routes>
          <Route path="main" element={<MainPage />} />
          <Route path="numbers" element={<NumbersPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="details" element={<DetailsPage />} />
          <Route path="remainder" element={<RemainderPage />} />
          <Route path="balance" element={<BalancePage />} />
          <Route path="applications" element={<ApplicationPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="main" />} />
          <Route path="gosuslugi-numbers" element={<GosuslugiNumbersPage />} />
          <Route path="gosuslugi-about" element={<GosuslugiAboutPage />} />
        </Routes>
      </div>

      <div className="footer grid-in-footer">
        <Footer />
      </div>
    </div>
  );
};

export default MainModule;
