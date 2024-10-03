import { FC, useState } from "react";

import { IRegistrationStepsProps } from "./registration-skelet";

import TextField from "../../../../ui/fields/text-field";
import NumberField from "../../../../ui/fields/number-field";
import { Button } from "../../../../ui/button";

// import { defaultStyles } from "../../../../../utils/default-styles";

type UserInfoState = {
  email: string;
  contactName: string;
  contactPhone: number | "";
  sim: number | "";
};

const RegistrationStepTwo: FC<IRegistrationStepsProps> = ({ step, setStep }) => {
  const [userInfo, setUserInfo] = useState<UserInfoState>({
    email: "",
    contactName: "",
    contactPhone: "",
    sim: "",
  });

  // const { bgColor } = defaultStyles;

  return (
    <div className="flex w-[290px] flex-col justify-center">
      {step === 3 ? (
        <NumberField
          id="sim-reg-form"
          placeholder="SIM"
          label="SIM"
          value={userInfo.sim}
          onChangeCb={(e) => setUserInfo({ ...userInfo, sim: +e.target.value.trim() })}
        />
      ) : null}

      <TextField
        id="email-reg-form"
        type="email"
        Label="Email"
        placeholder="email"
        value={userInfo.email}
        onChangeCb={(e) => setUserInfo({ ...userInfo, email: e.target.value.trim() })}
        addStyle="mb-[15px]"
      />

      <TextField
        id="name-reg-form"
        type="text"
        Label="Контактное имя"
        placeholder="Имя"
        value={userInfo.contactName}
        onChangeCb={(e) => setUserInfo({ ...userInfo, contactName: e.target.value.trim() })}
        addStyle="mb-[15px]"
      />

      <NumberField
        id="id-reg-form"
        placeholder="Номер телефона"
        label="Контактный номер телефона"
        value={userInfo.contactPhone}
        onChangeCb={(e) => setUserInfo({ ...userInfo, contactPhone: +e.target.value.trim() })}
        addStyle="mb-[15px]"
      />
      <Button buttonType="default" title="Отправить" onClickCb={() => setStep(step + 1)} />
    </div>
  );
};

export default RegistrationStepTwo;
