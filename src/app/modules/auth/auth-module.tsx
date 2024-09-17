import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

// import components
import RegistrationForm from './components/registration-form/registration-form';
import LoginForm from './components/login-form/login-form';
import RecoveryPassForm from './components/recovery-form/recovery-pass-form';
import RegistrationSuccess from './components/registration-form/registration-steps/registration-success';

const AuthModule: FC = () => {
  return (
    <>
      <div className="flex w-full items-center justify-center pt-[30vh]">
        <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route path="registration" element={<RegistrationForm />} />
          <Route path="recovery-pass" element={<RecoveryPassForm />} />
          <Route path="recovery-success" element={<RegistrationSuccess />} />
        </Routes>
      </div>
    </>
  );
};

export default AuthModule;
