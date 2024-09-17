import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import RegistrationStepOne from '../registration-steps/registration-step-one';
import RegistrationStepTwo from '../registration-steps/registration-step-two';
import RegistrationStepThree from '../registration-steps/registration-step-three';
import RegistrationSuccess from '../registration-steps/registration-success';

export interface IRegistrationStepsProps {
  step: number;
  setStep: (prev: number) => void;
}

const RegistrationSkelet: FC<IRegistrationStepsProps> = ({ step, setStep }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex min-w-[370px] flex-col items-center justify-center rounded-[12px] border-2 py-10 text-center">
        <p className="text-lg font-semibold text-[#071437]">Регистрация</p>
        <div className="mb-[15px]">
          <p className="text-[13px] font-medium text-[#78829D]">
            {step === 4 ? (
              'Введите код, отправленный на email'
            ) : (
              <>
                {' '}
                Уже есть аккаунт?{' '}
                <span
                  className="text-[#005DA6] hover:cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  Авторизация
                </span>
              </>
            )}
          </p>
        </div>
        {step === 1 ? (
          <RegistrationStepOne step={step} setStep={setStep} />
        ) : null}
        {step === 2 || step === 3 ? (
          <RegistrationStepTwo step={step} setStep={setStep} />
        ) : null}
        {step === 4 ? (
          <RegistrationStepThree step={step} setStep={setStep} />
        ) : null}
        {step === 5 ? <RegistrationSuccess /> : null}
      </div>
    </>
  );
};

export default RegistrationSkelet;
