import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

const RegistrationSuccess: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex min-w-[370px] flex-col items-center justify-center rounded-[12px] border-2 py-10 text-center">
        <p className="text-lg font-semibold text-[#071437]">
          Регистрация прошла успешно!
        </p>
        <button
          className="btn mt-[20px] w-[290px] justify-center bg-[#005DA6] text-center font-sans font-medium text-[#F6F8F8]"
          onClick={() => navigate('/login')}
        >
          Авторизоваться
        </button>
      </div>
    </>
  );
};

export default RegistrationSuccess;
