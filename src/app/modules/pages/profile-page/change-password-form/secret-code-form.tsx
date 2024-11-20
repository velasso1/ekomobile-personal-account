import { FC, useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_CHANGING_PASSWORD, SUBMIT_SECRET_KEY } from "../../../../api/apollo/mutations/change-password";

import { IChangePasswordState, ICreatePasswordChangeResponse } from "../../../../types/change-password-types";
import { ISecretCodeState } from "../../../../types/profile-info-types";

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
  const [createChangingPassword, { data, loading, error }] =
    useMutation<ICreatePasswordChangeResponse>(CREATE_CHANGING_PASSWORD);
  const [submitSecretKey, { data: submitData, loading: submitLoading, error: submitError }] =
    useMutation(SUBMIT_SECRET_KEY);

  const { selectedNumber } = useAppSelector((state) => state.userSlice);

  const [changingStep, setChangingStep] = useState<"1" | "2" | "3">("1");
  const [state, setState] = useState<ISecretCodeState>({
    error: {
      errorStatus: false,
      errorMessage: "",
    },
    loading: false,
    identifiers: {
      actionId: crypto.randomUUID(),
      correlationId: crypto.randomUUID(),
      passwordChangeId: crypto.randomUUID(),
    },
  });

  useEffect(() => {
    if (passState.secretKey.length === 6) submitingSecretKey();
  }, [passState.secretKey]);

  useEffect(() => {
    if (submitData) {
      console.log(submitData);
    }
  }, [submitData]);

  const createChangePassword = (): void => {
    createChangingPassword({
      variables: {
        actionId: state.identifiers.actionId,
        correlationId: state.identifiers.correlationId,
        passwordChangeId: state.identifiers.passwordChangeId,
        msisdn: selectedNumber,
      },
    });
  };

  const submitingSecretKey = () => {
    // query for check secret code

    // submitSecretKey({variables: {
    //   actionId: state.identifiers.actionId,
    //   correlationId: state.identifiers.correlationId,
    //   passwordChangeId: state.identifiers.passwordChangeId,
    //   secret: passState.secretKey,
    // }})

    // if code approved, show form with change pass (step 3),
    // if code not approved, show a warning badge;
    // if code not approved twice, show button for get new secret code;

    console.log(state.identifiers);
    setChangingStep("3");
  };

  if (error || submitError) {
    return <WarningBadge isError={true} message={error.message} />;
  }

  return (
    <div className="w-[290px]">
      {changingStep === "3" && (
        <ChangePasswordForm passState={passState} passChange={passChange} identifires={state.identifiers} />
      )}
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
