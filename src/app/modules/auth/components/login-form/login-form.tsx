import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import NumberField from "../../../ui/fields/number-field";
import { ModalHelp } from "../../../ui/index";
import EyeIcon from "../../../../utils/icons/eye-icon";

import { defaultStyles } from "../../../../utils/default-styles";
import { mainRoutes, authRoutes } from "../../../../utils/routes-name/main-routes";
import { Button } from "../../../ui/button";

type UserState = {
  login: string;
  password: string;
};

const LoginForm: FC = () => {
  const navigate = useNavigate();

  const [hidePass, setHidePass] = useState<boolean>(true);
  const [userState, setUserState] = useState<UserState>({
    login: "",
    password: "",
  });

  const { textSize, textColor } = defaultStyles;

  return (
    <>
      <div className="flex w-[370px] flex-col items-center justify-center rounded-[12px] border-2 py-5 text-center">
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
                  id="phone-field-reg"
                  placeholder="телефон"
                  label="Телефон"
                  value={userState.login}
                  onChangeCb={(e) =>
                    setUserState({
                      ...userState,
                      login: e.target.value.trim(),
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
                <div className="input w-[290px]">
                  <input
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
                buttonType="default"
                title="Продолжить"
                onClickCb={(e) => {
                  e.preventDefault();
                  navigate(mainRoutes.main);
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
      </div>
      <ModalHelp />
    </>
  );
};

export default LoginForm;
