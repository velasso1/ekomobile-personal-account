import React, { FC, useState } from "react";

import { useMutation } from "@apollo/client";
import { SUBMIT_CHANGING_PASSWORD } from "../../../../api/apollo/mutations/change-password";

import { Card } from "../../../ui/card";
import TextField from "../../../ui/fields/text-field";
import { Button } from "../../../ui/button";
import Loader from "../../../ui/loader/loader";
import { WarningBadge } from "../../../ui";

import { IChangePasswordState } from "../../../../types/change-password-types";

interface IChangePasswordFormProps {
  passState: IChangePasswordState;
  passChange: (IChangePasswordState) => void;
  identifires: { correlationId: string; actionId: string; passwordChangeId: string };
}

const ChangePasswordForm: FC<IChangePasswordFormProps> = ({ passState, passChange, identifires }) => {
  const [changePassword, { data, loading, error }] = useMutation(SUBMIT_CHANGING_PASSWORD);

  const validationNewPassword = (): string | boolean => {
    if (passState.newPassword !== passState.repeatNewPassword) {
      console.log("пароли не совпадают");
      return;
    }

    console.log(identifires);
    // changePassword({
    //   variables: {
    //     correlationId: identifires.correlationId,
    //     actionId: identifires.actionId,
    //     passwordChangeId: identifires.passwordChangeId,
    //     newPassword: null,
    //   },
    // });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <WarningBadge isError={true} message={error.message} />;
  }

  return (
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
      <Button buttonType="default" title="Сменить" onClickCb={() => validationNewPassword()} />
    </div>
  );
};

export default ChangePasswordForm;
