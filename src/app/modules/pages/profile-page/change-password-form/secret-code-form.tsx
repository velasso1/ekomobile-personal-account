import { FC, useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_CHANGING_PASSWORD, SUBMIT_SECRET_KEY } from "../../../../api/apollo/mutations/change-password";

import { IChangePasswordState, ICreatePasswordChangeResponse, ISubmitSecretKeyResponse } from "../../../../types/change-password-types";
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
    useMutation<ISubmitSecretKeyResponse>(SUBMIT_SECRET_KEY);

  const { selectedNumber } = useAppSelector((state) => state.userSlice);

  const [changingStep, setChangingStep] = useState<"1" | "2" | "3">("1");
  const [successSubmit, setSuccessSubmit] = useState<{submitCount: number, succes: boolean}>({submitCount: 0, succes: false});
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
      verificationId: null, 
    },
  });

  useEffect(() => {
    if (passState.secretKey.length === 6) {
      submitingSecretKey();
      passChange({...passState, secretKey: ''});
    };
  }, [passState.secretKey]);

  useEffect(() => {
    if (data) {
      setState({...state, identifiers: {...state.identifiers, verificationId: data.passwordChangeCreate.verificationId}});
      setChangingStep("2");
    }
  }, [data])

  useEffect(() => {
    if (submitData && submitData.verificationSubmit.result.isSuccess) {
      setChangingStep("3");
      return;
    }

  }, [submitData])

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
    submitSecretKey({variables: {
      actionId: state.identifiers.actionId,
      correlationId: state.identifiers.correlationId,
      verificationId: state.identifiers.verificationId,
      secret: passState.secretKey,
    }})

    // if code not approved twice, show button for get new secret code;
  };

  if (loading) {
    return (
      <Loader/>
    )
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
          Label={`${submitData?.verificationSubmit.result.notice ?? "Введите секретный код"}`}
          placeholder="Введите секретный код"
          value={passState.secretKey}
          onChangeCb={(e) => {
            passChange({ ...passState, secretKey: e.target.value });
          }}
          error={submitData?.verificationSubmit.result.isSuccess === false}
        />
      )}

      {changingStep === "1" && (
        <Button
          buttonType="default"
          title="Получить код для смены пароля"
          onClickCb={() => {
            createChangePassword();
          }}
        />
      )}
    </div>
  );
};

export default SecretKeyForm;
