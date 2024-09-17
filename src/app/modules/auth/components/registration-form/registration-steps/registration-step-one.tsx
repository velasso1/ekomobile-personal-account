import { FC, useState } from 'react';
import { IRegistrationStepsProps } from './registration-skelet';

import NumberField from '../../../../ui/fields/number-field';
import SuccessIcon from '../../../../../utils/icons/success-icon';

const RegistrationStepOne: FC<IRegistrationStepsProps> = ({
  step,
  setStep,
}) => {
  const [userPhone, setUserPhone] = useState<string>('');

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
        <div className="flex w-[290px] flex-col justify-center">
          <button
            className="btn mt-[20px] justify-center bg-[#005DA6] text-center font-sans font-medium text-[#F6F8F8]"
            onClick={(e) => {
              e.preventDefault();
              setStep(step + 1);
            }}
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationStepOne;
