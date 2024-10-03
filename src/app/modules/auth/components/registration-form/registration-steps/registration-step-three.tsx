import { FC, useState } from "react";

import { IRegistrationStepsProps } from "./registration-skelet";

import NumberField from "../../../../ui/fields/number-field";
import { Button } from "../../../../ui/button";

// import { defaultStyles } from "../../../../../utils/default-styles";

const RegistrationStepThree: FC<IRegistrationStepsProps> = ({ step, setStep }) => {
  const [code, setCode] = useState<number | "">("");

  // const { bgColor } = defaultStyles;

  return (
    <div className="w-[290px]">
      <NumberField
        id="code-reg-form"
        placeholder="Код"
        label="Код"
        value={code}
        onChangeCb={(e) => setCode(+e.target.value.trim())}
      />
      <div className="mt-[15px] flex justify-between">
        <Button buttonType="default" title="Отправить" onClickCb={() => setStep(step + 1)} />
        <Button buttonType="custom" title="Отмена" customStyle="w-full ml-[12px] border-[#F1F1F4] bg-[#fff]" />
      </div>
    </div>
  );
};

export default RegistrationStepThree;
