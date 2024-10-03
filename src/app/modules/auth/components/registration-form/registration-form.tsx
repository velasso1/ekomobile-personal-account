import React, { FC, useState } from "react";

import RegistrationSkelet from "./registration-steps/registration-skelet";
import RegistrationSuccess from "./registration-steps/registration-success";

const RegistrationForm: FC = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="flex w-full items-center justify-center">
      {step === 5 ? <RegistrationSuccess /> : <RegistrationSkelet step={step} setStep={setStep} />}
    </div>
  );
};

export default RegistrationForm;
