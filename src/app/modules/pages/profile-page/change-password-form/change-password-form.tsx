import React, { FC, useEffect, useState } from "react";

import { useMutation } from "@apollo/client";
import { SUBMIT_CHANGING_PASSWORD } from "../../../../api/apollo/mutations/change-password";

import { Card } from "../../../ui/card";
import TextField from "../../../ui/fields/text-field";
import { Button } from "../../../ui/button";
import Loader from "../../../ui/loader/loader";
import { WarningBadge } from "../../../ui";
import Warning from "../../../ui/warning/warning";

import { IChangePasswordState } from "../../../../types/change-password-types";

interface IChangePasswordFormProps {
  passState: IChangePasswordState;
  passChange: (IChangePasswordState) => void;
  identifires: { correlationId: string; actionId: string; passwordChangeId: string };
}

const ChangePasswordForm: FC<IChangePasswordFormProps> = ({ passState, passChange, identifires }) => {
  const [changePassword, { data, loading, error }] = useMutation(SUBMIT_CHANGING_PASSWORD);

  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

  const validationNewPassword = (): string | boolean => {
    if (passState.newPassword !== passState.repeatNewPassword) {
      setPasswordMatch(false);
      return;
    }

    changePassword({
      variables: {
        correlationId: identifires.correlationId,
        actionId: identifires.actionId,
        passwordChangeId: identifires.passwordChangeId,
        newPassword: passState.newPassword,
      },
    });
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <WarningBadge isError={true} message={error.message} />;
  }

  return (
    <>
      {data ? (
        <p>Пароль успешно изменен</p>
      ) : (
        <div className="w-[290px]">
          <TextField
            id="change-info-new-pass"
            type="password"
            Label="Придумайте новый пароль"
            placeholder="Введите новый пароль"
            value={passState.newPassword}
            onChangeCb={(e) => {
              passChange({ ...passState, newPassword: e.target.value.trim() });
            }}
            addStyle="mb-[20px]"
          />

          <TextField
            id="change-info-repeat-new-pass"
            type="password"
            Label="Введите пароль еще раз"
            placeholder="Повторите новый пароль"
            value={passState.repeatNewPassword}
            onChangeCb={(e) => {
              passChange({ ...passState, repeatNewPassword: e.target.value.trim() });
            }}
            addStyle="mb-[20px]"
          />

          {!passwordMatch && (
            <div className="mb-[20px] flex w-[100%] items-center justify-center">
              <Warning text="Пароли не совпадают" />
            </div>
          )}
          <Button
            disabled={!passState.newPassword || !passState.repeatNewPassword || loading}
            buttonType="default"
            title="Сменить"
            onClickCb={() => validationNewPassword()}
          />
        </div>
      )}
    </>
  );
};

export default ChangePasswordForm;
