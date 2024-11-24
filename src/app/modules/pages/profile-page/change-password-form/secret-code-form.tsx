import { FC, useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_CHANGING_PASSWORD, SUBMIT_SECRET_KEY } from "../../../../api/apollo/mutations/change-password";

import {
  IChangePasswordState,
  ICreatePasswordChangeResponse,
  ISubmitSecretKeyResponse,
} from "../../../../types/change-password-types";
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
    useMutation<ISubmitSecretKeyResponse>(SUBMIT_SECRET_KEY, { fetchPolicy: "no-cache" });

  const { selectedNumber } = useAppSelector((state) => state.userSlice);

  const [changingStep, setChangingStep] = useState<"1" | "2" | "3">("1");

  const [state, setState] = useState<ISecretCodeState>({
    error: {
      errorStatus: false,
      errorMessage: "",
    },
    submitAttempts: 0,
    loading: false,
    identifiers: {
      actionId: crypto.randomUUID(),
      correlationId: crypto.randomUUID(),
      passwordChangeId: crypto.randomUUID(),
      verificationId: null,
    },
  });

  useEffect(() => {
    if (passState.secretKey.length === 6) {
      submitingSecretKey();
      passChange({ ...passState, secretKey: "" });
    }
  }, [passState.secretKey]);

  useEffect(() => {
    if (data) {
      setState({
        ...state,
        identifiers: { ...state.identifiers, verificationId: data.passwordChangeCreate.verificationId },
      });
      setChangingStep("2");
    }
  }, [data]);

  useEffect(() => {
    if (submitData?.verificationSubmit.result.isSuccess) {
      setChangingStep("3");
    }

    if (submitData && !submitData?.verificationSubmit.result.isSuccess) {
      setState({ ...state, submitAttempts: ++state.submitAttempts });
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
    submitSecretKey({
      variables: {
        actionId: state.identifiers.actionId,
        correlationId: state.identifiers.correlationId,
        verificationId: state.identifiers.verificationId,
        secret: passState.secretKey,
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error || submitError) {
    return <WarningBadge isError={true} message={error?.message} />;
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
          disabled={submitLoading}
          Label={`${state.submitAttempts > 0 ? (submitData?.verificationSubmit.result.notice ?? "Проверяем..") : "Введите секретный код"}`}
          placeholder="Введите секретный код"
          value={passState.secretKey}
          onChangeCb={(e) => {
            passChange({ ...passState, secretKey: e.target.value });
          }}
          error={submitData?.verificationSubmit.result.isSuccess === false}
          addStyle="mb-[20px]"
        />
      )}

      {(changingStep === "1" || state.submitAttempts >= 2) && (
        <Button
          buttonType="default"
          disabled={submitLoading}
          title={`${state.submitAttempts >= 2 ? "Получить новый код" : "Получить код для смены пароля"}`}
          onClickCb={() => {
            setState({ ...state, submitAttempts: 0 });
            createChangePassword();
          }}
        />
      )}
    </div>
  );
};

export default SecretKeyForm;
