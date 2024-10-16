import { FC, useState } from "react";

import { IRegistrationStepsProps } from "./registration-skelet";

import TextField from "../../../../ui/fields/text-field";
import NumberField from "../../../../ui/fields/number-field";
import Warning from "../../../../ui/warning/warning";
import { Button } from "../../../../ui/button";

const RegistrationStepTwo: FC<IRegistrationStepsProps> = ({ userInfo, setUserInfo, step, setStep }) => {
  const [correctInfo, setCorrectInfo] = useState<boolean>(true);

  const checkUserInfo = () => {
    setCorrectInfo(true);
    for (const key in userInfo) {
      if (step === 2 && key === "sim") continue;

      if (userInfo[key].length < 2) {
        setCorrectInfo(false);
        return;
      }
    }

    setStep(step + 1);
  };

  return (
    <div className="flex w-[290px] flex-col justify-center">
      {step === 3 ? (
        <NumberField
          id="sim-reg-form"
          placeholder="SIM"
          label="SIM"
          value={userInfo.sim}
          onChangeCb={(e) => setUserInfo({ ...userInfo, sim: e.target.value.trim() })}
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
        onChangeCb={(e) => setUserInfo({ ...userInfo, contactPhone: e.target.value.trim() })}
        addStyle="mb-[15px]"
      />

      <Button
        buttonType="default"
        title="Отправить"
        onClickCb={() => {
          checkUserInfo();
        }}
      />
      {!correctInfo && <Warning text="Все поля должны быть заполнены" />}
    </div>
  );
};

export default RegistrationStepTwo;
