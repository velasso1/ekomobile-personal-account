import { FC, useState } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_REGISTRATION } from "../../../../../api/apollo/mutations/registration";
import { REGISTRATION_VERIFY } from "../../../../../api/apollo/mutations/registration";

import { IRegistrationStepsProps } from "./registration-skelet";

import TextField from "../../../../ui/fields/text-field";
import NumberField from "../../../../ui/fields/number-field";
import Warning from "../../../../ui/warning/warning";
import { Button } from "../../../../ui/button";
import { WarningBadge } from "../../../../ui";
import Loader from "../../../../ui/loader/loader";

const RegistrationStepTwo: FC<IRegistrationStepsProps> = ({ userInfo, setUserInfo, step, setStep }) => {
  const [correctInfo, setCorrectInfo] = useState<boolean>(true);

  const [sendRegistrationData, { data, loading, error }] = useMutation(CREATE_REGISTRATION);
  const [registrationVerify, { data: regVerify, loading: regLoading, error: regError }] =
    useMutation(REGISTRATION_VERIFY);

  const checkUserInfo = () => {
    setCorrectInfo(true);
    for (const key in userInfo) {
      if (step === 2 && key === "sim") continue;

      if (userInfo[key].length < 2) {
        setCorrectInfo(false);
        return;
      }
    }

    sendRegistrationRequest();
    setStep(step + 1);
  };

  const sendRegistrationRequest = () => {
    if (step === 3) {
      const correlationId = crypto.randomUUID();
      const actionId = crypto.randomUUID();
      const registrationId = crypto.randomUUID();

      sendRegistrationData({
        variables: {
          correlation: correlationId,
          actionId: actionId,
          registrationId: registrationId,
          msisdn: userInfo.sim,
          sim: userInfo.sim,
          contactPhone: userInfo.contactPhone,
          contactName: userInfo.contactName,
          email: userInfo.email,
        },
      });

      registrationVerify({
        variables: {
          correlation: correlationId,
          actionId: actionId,
          registrationId: registrationId,
        },
      });
    }
  };

  if (error || regError) {
    return <WarningBadge isError={true} />;
  }

  if (loading || regLoading) {
    return <Loader />;
  }

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
