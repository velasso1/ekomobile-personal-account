import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { CHECK_AUTH_USER } from "../../../../api/apollo/queries/refresh-session";
import { ICheckUserAuth } from "../../../../api/apollo/queries/refresh-session";

import { useAppDispatch, useAppSelector } from "../../../../store";
import { signIn, checkAccStatusOnSignIn } from "../../../../store/slices/auth-slice";

import { TUserState } from "../../../../types/login-state-types";

import { ModalHelp } from "../../../ui/index";
import { Button } from "../../../ui/button";
import NumberField from "../../../ui/fields/number-field";
import Warning from "../../../ui/warning/warning";
import { WarningBadge } from "../../../ui/index";
import Loader from "../../../ui/loader/loader";

import { defaultStyles } from "../../../../utils/default-styles";
import { authRoutes, mainRoutes } from "../../../../utils/routes-name/main-routes";
import EyeIcon from "../../../../utils/icons/eye-icon";

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery<ICheckUserAuth>(CHECK_AUTH_USER, { fetchPolicy: "no-cache" });

  const { isLoading, isError } = useAppSelector((state) => state.routeSlice);

  const [hidePass, setHidePass] = useState<boolean>(true);
  const [emptyField, setEmptyFields] = useState<boolean>(false);
  const [userState, setUserState] = useState<TUserState>({
    username: "9663740842",
    password: "mIuBkrA8EnK8",
  });

  const { textSize, textColor } = defaultStyles;

  useEffect(() => {
    if (data && data.me !== null) {
      dispatch(checkAccStatusOnSignIn(200));
      return;
    }
    dispatch(checkAccStatusOnSignIn(401));
  }, [data, dispatch]);

  const handleSignIn = (): void => {
    setEmptyFields(false);
    if (userState.username.length > 5 && userState.password.length > 5) {
      dispatch(signIn(userState));
      setUserState({ username: "9663740842", password: "mIuBkrA8EnK8" });
      return;
    }

    setEmptyFields(true);
  };

  return (
    <div className="flex flex-col items-center">
      {(isError || error) && <WarningBadge isError={true} />}
      <div
        className={`${isLoading ? "opacity-[70%]" : null} flex w-[370px] flex-col items-center justify-center rounded-[12px] border-2 py-5 text-center`}
      >
        {(isLoading || loading) && <Loader />}

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
                <NumberField
                  disabled={isLoading}
                  id="phone-field-log"
                  placeholder="телефон"
                  label="Телефон"
                  value={userState.username}
                  onChangeCb={(e) =>
                    setUserState({
                      ...userState,
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
