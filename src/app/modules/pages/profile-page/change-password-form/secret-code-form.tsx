import { FC, useState } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_CHANGING_PASSWORD, CHANGE_PASSWORD_SUBMIT } from "../../../../api/apollo/mutations/change-password";

import { IChangePasswordState } from "../../../../types/change-password-types";

import { useAppSelector } from "../../../../store";

import { Button } from "../../../ui/button";
import TextField from "../../../ui/fields/text-field";
import Loader from "../../../ui/loader/loader";
import { WarningBadge } from "../../../ui";
import ChangePasswordForm from "./change-password-form";

interface ISecretKeyFormProps {
  passState: IChangePasswordState;
  passChange: (IChangePasswordState) => void;
}

const SecretKeyForm: FC<ISecretKeyFormProps> = ({ passState, passChange }) => {
  const [createChangingPassword, { data, loading, error }] = useMutation(CREATE_CHANGING_PASSWORD);
  const [submitSecretKey, { data: keyData, loading: keyLoading, error: keyError }] =
    useMutation(CHANGE_PASSWORD_SUBMIT);

  const { selectedNumber } = useAppSelector((state) => state.userSlice);

  const [changingStep, setChangingStep] = useState<"1" | "2" | "3">("1");

  const createChangePassword = (): void => {
    createChangingPassword({
      variables: {
        correlationId: crypto.randomUUID(),
        actionId: crypto.randomUUID(),
        passwordChangeId: crypto.randomUUID(),
        msisdn: selectedNumber,
      },
    });
  };

  const submitingSecretKey = () => {
    if (passState.secretKey.length === 6) {
      submitSecretKey({ variables: {} });
    }
  };

  if (error) {
    return <WarningBadge isError={true} />;
  }

  return (
    <div className="w-[290px]">
      {changingStep === "3" && <ChangePasswordForm passState={passState} passChange={passChange} />}
      {changingStep === "2" && (
        <TextField
          id="secret-key-field"
          type="password"
          Label="Секретный код"
          placeholder="Введите секретный код"
          value={passState.secretKey}
          onChangeCb={(e) => {
            passChange({ ...passState, secretKey: e.target.value });
            submitingSecretKey();
          }}
          addStyle="mb-[20px]"
        />
      )}

      {changingStep === "1" && (
        <Button
          buttonType="default"
          title="Получить код для смены пароля"
          onClickCb={() => {
            createChangePassword();
            setChangingStep("2");
          }}
        />
      )}
    </div>
  );
};

export default SecretKeyForm;
