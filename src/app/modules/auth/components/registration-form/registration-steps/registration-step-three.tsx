import React, { FC, useState } from 'react';

import { IRegistrationStepsProps } from './registration-skelet';

import NumberField from '../../../../ui/fields/number-field';

const RegistrationStepThree: FC<IRegistrationStepsProps> = ({
  step,
  setStep,
}) => {
  const [code, setCode] = useState<number | ''>('');

  return (
    <>
      <div className="w-[290px]">
        <NumberField
          id="code-reg-form"
          placeholder="Код"
          label="Код"
          value={code}
          onChangeCb={(e) => setCode(+e.target.value.trim())}
        />
        <div className="flex justify-between">
          <button
            className="btn mt-[15px] w-full justify-center bg-[#005DA6] font-medium text-[#F6F8F8]"
            onClick={() => setStep(step + 1)}
          >
            Отправить
          </button>
          <button className="border-1 btn ml-[12px] mt-[15px] w-full justify-center border-[#F1F1F4] bg-[#F9F9F9]">
            Отмена
          </button>
        </div>
      </div>
    </>
  );
};

export default RegistrationStepThree;
