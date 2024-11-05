import React, { FC, useState } from "react";

import { Card } from "../../../ui/card";
import TextField from "../../../ui/fields/text-field";
import { Button } from "../../../ui/button";
import { IChangePasswordState } from "../../../../types/change-password-types";

interface IChangePasswordFormProps {
  passState: IChangePasswordState;
  passChange: (IChangePasswordState) => void;
}

const ChangePasswordForm: FC<IChangePasswordFormProps> = ({ passState, passChange }) => {
  // query for mutation new password;

  const validationNewPassword = (): string | boolean => {
    if (passState.newPassword !== passState.repeatNewPassword) {
      console.log("пароли не совпадают");
      return "Пароли не совпадают";
    }

    if (passState.currentPass !== "HERE NEEDS A CURRENT USER-PASSWORD") {
      console.log("текущий пароль введен неверно");
      return "текущий пароль введён неверно";
    }

    changePassword();
  };

  const changePassword = () => {
    console.log("pass was changed");
  };

  return (
    <div>
      <TextField
        id="change-info-pass"
        type="password"
        Label="Текущий пароль"
        placeholder="Текущий пароль"
        value={passState.currentPass}
        onChangeCb={(e) => {
          passChange({ ...passState, currentPass: e.target.value.trim() });
        }}
        addStyle="mb-[20px]"
      />

      <TextField
        id="change-info-new-pass"
        type="password"
        Label="Новый пароль"
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
        Label="Повторите новый пароль"
        placeholder="Повторите новый пароль"
        value={passState.repeatNewPassword}
        onChangeCb={(e) => {
          passChange({ ...passState, repeatNewPassword: e.target.value.trim() });
        }}
        addStyle="mb-[20px]"
      />
      <div className="w-[290px]">
        <Button buttonType="default" title="Сменить" onClickCb={() => validationNewPassword()} />
      </div>
    </div>
  );
};

export default ChangePasswordForm;
