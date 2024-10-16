import { FC, useState } from "react";

import { IRegFormState } from "../../../../types/registration-types";

import RegistrationSkelet from "./registration-steps/registration-skelet";
import RegistrationSuccess from "./registration-steps/registration-success";

const RegistrationForm: FC = () => {
  const [step, setStep] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<IRegFormState>({
    sim: "",
    phone: "",
    email: "",
    contactName: "",
    contactPhone: "",
  });

  return (
    <div className="flex w-full items-center justify-center">
      {step === 5 ? (
        <RegistrationSuccess />
      ) : (
        <RegistrationSkelet userInfo={userInfo} setUserInfo={setUserInfo} step={step} setStep={setStep} />
      )}
    </div>
  );
};

export default RegistrationForm;
