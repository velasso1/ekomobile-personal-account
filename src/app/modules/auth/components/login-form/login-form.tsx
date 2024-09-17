import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NumberField from '../../../ui/fields/number-field';
import { ModalHelp } from '../../../ui/index';
import EyeIcon from '../../../../utils/icons/eye-icon';

type UserState = {
  login: string;
  password: string;
};

const LoginForm: FC = () => {
  const navigate = useNavigate();

  const [hidePass, setHidePass] = useState<boolean>(true);
  const [userState, setUserState] = useState<UserState>({
    login: '',
    password: '',
  });

  return (
    <>
      <div className="flex w-[370px] flex-col items-center justify-center rounded-[12px] border-2 py-5 text-center">
        <p className="text-lg font-semibold text-[#071437]">Авторизация</p>
        <div className="mb-[15px]">
          <p className="text-[13px] font-medium text-[#78829D]">
            Еще нет аккаунта?{' '}
            <span
              className="text-[#005DA6] hover:cursor-pointer"
              onClick={() => navigate('/auth/registration')}
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

                <label
                  htmlFor="pass-field-reg"
                  className="block text-left text-sm font-medium dark:text-white"
                >
                  <div className="mb-[5px] flex justify-between">
                    <div className="">Пароль</div>
                    <div
                      className="text-[13px] text-[#005DA6] hover:cursor-pointer"
                      onClick={() => navigate('/auth/recovery-pass')}
                    >
                      Забыли пароль?
                    </div>
                  </div>
                </label>
                <div className="input w-[290px]">
                  <input
                    className=""
                    type={hidePass ? 'password' : 'text'}
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
            <div className="flex w-[290px] flex-col justify-center">
              <button
                className="btn mt-[20px] justify-center bg-[#005DA6] text-center font-sans font-medium text-[#F6F8F8]"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/main/main');
                }}
              >
                Продолжить
              </button>
              <button
                className="btn mt-[10px] justify-center text-[13px] text-[#005DA6]"
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
