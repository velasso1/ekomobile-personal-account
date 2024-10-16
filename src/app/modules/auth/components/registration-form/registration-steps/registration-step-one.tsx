import { FC, useState } from "react";
import { IRegistrationStepsProps } from "./registration-skelet";

import NumberField from "../../../../ui/fields/number-field";
import Warning from "../../../../ui/warning/warning";
import { Button } from "../../../../ui/button";

import SuccessIcon from "../../../../../utils/icons/success-icon";

const RegistrationStepOne: FC<IRegistrationStepsProps> = ({ userInfo, setUserInfo, step, setStep }) => {
  const [emptyField, setEmptyField] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="" action="">
        <div className="flex min-w-[290px] flex-col gap-2.5">
          <NumberField
            id="phone-field-reg"
            placeholder="телефон"
            label="Телефон"
            value={userInfo.phone}
            onChangeCb={(e) => setUserInfo({ ...userInfo, phone: e.target.value.trim() })}
            Icon={SuccessIcon}
            addStyle={`${emptyField && "border-[red]"}`}
          />
        </div>
        <div className="mt-[20px] flex w-[290px] flex-col justify-center">
          <Button
            buttonType="default"
            title="Продолжить"
            onClickCb={(e) => {
              e.preventDefault();
              if (userInfo.phone.length < 10) {
                setEmptyField(true);
                return;
              }

              setStep(step + 1);
            }}
          />
          {emptyField && <Warning text="Ввёден некорректный номер" />}
        </div>
      </form>
    </div>
  );
};

export default RegistrationStepOne;
