import { FC } from "react";
import { useNavigate } from "react-router-dom";

import RegistrationStepOne from "../registration-steps/registration-step-one";
import RegistrationStepTwo from "../registration-steps/registration-step-two";
import RegistrationStepThree from "../registration-steps/registration-step-three";
import RegistrationSuccess from "../registration-steps/registration-success";

import { defaultStyles } from "../../../../../utils/default-styles";
import { authRoutes } from "../../../../../utils/routes-name/main-routes";

export interface IRegistrationStepsProps {
  step: number;
  setStep: (prev: number) => void;
}

const RegistrationSkelet: FC<IRegistrationStepsProps> = ({ step, setStep }) => {
  const navigate = useNavigate();

  const { textSize, textColor } = defaultStyles;

  return (
    <div className="flex min-w-[370px] flex-col items-center justify-center rounded-[12px] border-2 py-10 text-center">
      <p className={`text-lg font-semibold ${textColor.darkBlue}`}>Регистрация</p>
      <div className="mb-[15px]">
        <p className={`${textSize.default} font-medium ${textColor.grey}`}>
          {step === 4 ? (
            "Введите код, отправленный на email"
          ) : (
            <>
              <span className="mr-[5px]">Уже есть аккаунт?</span>
              <span className={`${textColor.primary} hover:cursor-pointer`} onClick={() => navigate(authRoutes.login)}>
                Авторизация
              </span>
            </>
          )}
        </p>
      </div>
      {step === 1 && <RegistrationStepOne step={step} setStep={setStep} />}
      {(step === 2 || step === 3) && <RegistrationStepTwo step={step} setStep={setStep} />}
      {step === 4 && <RegistrationStepThree step={step} setStep={setStep} />}
      {step === 5 && <RegistrationSuccess />}
    </div>
  );
};

export default RegistrationSkelet;
