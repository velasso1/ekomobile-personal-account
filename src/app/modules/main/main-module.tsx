import { FC } from 'react';

import { Routes, Route } from 'react-router-dom';

import SideBar from '../sidebar/components/sidebar-module';

import { Header } from '../ui/header';
import { Footer } from '../ui/footer';

import { MainPage } from '../pages/main-page';
import { NumbersPage } from '../pages/numbers-page';
import { ServicesPage } from '../pages/services-page';
import { ExpensesPage } from '../pages/expenses-page';
import { DetailsPage } from '../pages/details-page';
import { RemainderPage } from '../pages/remainder-page';
import { BalancePage } from '../pages/balance-page';
import { ApplicationPage } from '../pages/application-page';
import { ProfilePage } from '../pages/profile-page';

const MainModule: FC = () => {
  return (
    <div className="grid h-full w-full grid-cols-layout grid-rows-layout grid-areas-layout">
      <div className="sidebar grid-in-nav">
        <SideBar />
      </div>
      <div className="header w-full min-w-[100%] grid-in-header">
        <Header />
      </div>

      <div className="main-content mb-[40px] bg-[#F6F8F8] grid-in-main">
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
        </Routes>
      </div>

      <div className="footer bg-[#F6F8F8] grid-in-footer">
        <Footer />
      </div>
    </div>
  );
};

export default MainModule;
