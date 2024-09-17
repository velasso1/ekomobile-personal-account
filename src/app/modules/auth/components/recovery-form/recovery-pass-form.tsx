import { FC, useState } from 'react';

import NumberField from '../../../ui/fields/number-field';

import { useNavigate } from 'react-router-dom';

const RecoveryPassForm: FC = () => {
  const navigate = useNavigate();

  const [userPhone, setUserPhone] = useState<number | ''>('');

  return (
    <>
      <div className="flex min-w-[370px] flex-col items-center justify-center rounded-[12px] border-2 py-10 text-center">
        <p className="text-lg font-semibold text-[#071437]">Забыли пароль?</p>
        <p className="text-[13px] font-medium text-[#78829D]">
          Введите ваш номер телефона для <br /> восстановления пароля
        </p>
        <div className="mt-[20px] w-[290px]">
          <NumberField
            id="recovery-phone"
            placeholder="Телефон"
            label="Телефон"
            value={userPhone}
            onChangeCb={(e) => setUserPhone(+e.target.value.trim())}
          />
        </div>
        <div className="flex w-[290px] justify-between">
          <button
            className="btn mt-[15px] w-full justify-center bg-[#005DA6] font-medium text-[#F6F8F8]"
            onClick={() => navigate('/auth/recovery-success')}
          >
            Отправить
          </button>
          <button className="border-1 btn ml-[12px] mt-[15px] w-full justify-center border-[#F1F1F4] bg-[#F9F9F9]">
            Отмена
          </button>
        </div>
      </div>
    </>
  );
};

export default RecoveryPassForm;
