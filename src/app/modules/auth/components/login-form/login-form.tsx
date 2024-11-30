import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { CHECK_AUTH_USER } from "../../../../api/apollo/queries/refresh-session";
import { ICheckUserAuth } from "../../../../api/apollo/queries/refresh-session";

import { useAppDispatch, useAppSelector } from "../../../../store";
import { signIn, checkAccStatusOnSignIn, requestIsLoading } from "../../../../store/slices/auth-slice";

import { TUserState } from "../../../../types/login-state-types";

//
import ModalBalance from "../../../ui/modals/modal-balance";
//

import { ModalHelp } from "../../../ui/index";
import { Button } from "../../../ui/button";
import NumberField from "../../../ui/fields/number-field";
import TextField from "../../../ui/fields/text-field";
import Warning from "../../../ui/warning/warning";
import { WarningBadge } from "../../../ui/index";
import Loader from "../../../ui/loader/loader";

import { defaultStyles } from "../../../../utils/default-styles";
import { authRoutes, mainRoutes } from "../../../../utils/routes-name/main-routes";
import EyeIcon from "../../../../utils/icons/eye-icon";

import { setChecking } from "../../../../store/slices/auth-slice";
import { formatPhoneNumber } from "../../../../utils/helpers/phone-formatter";

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, accIsAuth, loginRequestSend } = useAppSelector((state) => state.routeSlice);

  const [hidePass, setHidePass] = useState<boolean>(true);
  const [emptyField, setEmptyFields] = useState<boolean>(false);
  const [userState, setUserState] = useState<TUserState>({
    username: "",
    formattedUsername: "",
    password: "",
  });

  useEffect(() => {
    dispatch(setChecking(false));
  }, []);

  const { textSize, textColor } = defaultStyles;

  const handleSignIn = (): void => {
    setEmptyFields(false);
    if (userState.username.length > 5 && userState.password.length > 5) {
      dispatch(signIn(userState));
      setUserState({ username: "", formattedUsername: "", password: "" });
      return;
    }
    setEmptyFields(true);
  };

  return (
    <div className="flex flex-col items-center">
      {isError && <WarningBadge isError={true} />}
      <div
        className={`${isLoading ? "opacity-[70%]" : null} flex w-[370px] flex-col items-center justify-center rounded-[12px] border-2 py-5 text-center`}
      >
        {isLoading && <Loader />}

        <p className={`text-lg font-semibold ${textColor.darkBlue}`}>Авторизация</p>
        <div className="mb-[15px]">
          <p className={`${textSize.default} font-medium ${textColor.grey}`}>
            <span className="mr-[5px]">Еще нет аккаунта?</span>

            <span
              className={`${textColor.primary} hover:cursor-pointer`}
              onClick={() => navigate(authRoutes.registration)}
            >
              Зарегистрироваться
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <form className="" action="">
            <div className="flex w-full justify-center">
              <div className="flex min-w-[290px] flex-col">
                <TextField
                  disabled={isLoading}
                  id="phone-field-log"
                  type="text"
                  placeholder="+7 (900) 000-00-00"
                  Label="Телефон"
                  value={userState.formattedUsername}
                  onChangeCb={(e) =>
                    setUserState({
                      ...userState,
                      formattedUsername: formatPhoneNumber(e.target.value.trim()),
                      username: e.target.value.trim(),
                    })
                  }
                />

                <label htmlFor="pass-field-reg" className="block text-left text-sm font-medium dark:text-white">
                  <div className="mb-[5px] flex justify-between">
                    <div className="">Пароль</div>
                    <div
                      className={`${textSize.default} ${textColor.primary} hover:cursor-pointer`}
                      onClick={() => navigate(authRoutes.recovery)}
                    >
                      Забыли пароль?
                    </div>
                  </div>
                </label>
                <div className={`input w-[290px]`}>
                  <input
                    disabled={isLoading}
                    className=""
                    type={hidePass ? "password" : "text"}
                    id="pass-field-reg"
                    placeholder="пароль"
                    value={userState.password}
                    onChange={(e) =>
                      setUserState({
                        ...userState,
                        password: e.target.value.trim(),
                      })
                    }
                    required
                  />
                  <button className="btn-icon btn">
                    <EyeIcon onClickCb={() => setHidePass((prev) => !prev)} />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-[20px] flex w-[290px] flex-col justify-center">
              <Button
                disabled={isLoading}
                buttonType="default"
                title="Продолжить"
                onClickCb={(e) => {
                  e.preventDefault();
                  handleSignIn();
                }}
              />
              <button
                className={`btn mt-[10px] justify-center ${textSize.default} ${textColor.darkBlue}`}
                data-modal-toggle="#modal_4"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Помощь
              </button>
            </div>
          </form>
        </div>
        {emptyField && <Warning text="Заполните все поля корректно" />}
      </div>
      <ModalHelp />
    </div>
  );
};

export default LoginForm;
