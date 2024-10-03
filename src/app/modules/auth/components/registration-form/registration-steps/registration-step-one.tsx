import { FC, useState } from "react";
import { IRegistrationStepsProps } from "./registration-skelet";

import NumberField from "../../../../ui/fields/number-field";
import { Button } from "../../../../ui/button";

import SuccessIcon from "../../../../../utils/icons/success-icon";
// import { defaultStyles } from "../../../../../utils/default-styles";

const RegistrationStepOne: FC<IRegistrationStepsProps> = ({ step, setStep }) => {
  const [userPhone, setUserPhone] = useState<string>("");

  // const { bgColor } = defaultStyles;

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="" action="">
        <div className="flex min-w-[290px] flex-col gap-2.5">
          <NumberField
            id="phone-field-reg"
            placeholder="телефон"
            label="Телефон"
            value={userPhone}
            onChangeCb={(e) => setUserPhone(e.target.value.trim())}
            Icon={SuccessIcon}
          />
        </div>
        <div className="mt-[20px] flex w-[290px] flex-col justify-center">
          <Button
            buttonType="default"
            title="Продолжить"
            onClickCb={(e) => {
              e.preventDefault();
              setStep(step + 1);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default RegistrationStepOne;
