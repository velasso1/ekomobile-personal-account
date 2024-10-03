import { FC } from "react";

import { useNavigate } from "react-router-dom";
import { defaultStyles } from "../../../../../utils/default-styles";

import { authRoutes } from "../../../../../utils/routes-name/main-routes";
import { Button } from "../../../../ui/button";

const RegistrationSuccess: FC = () => {
  const navigate = useNavigate();

  const { textColor } = defaultStyles;

  return (
    <div className="flex min-w-[370px] flex-col items-center justify-center rounded-[12px] border-2 py-10 text-center">
      <div className="flex flex-col">
        <p className={`text-lg font-semibold ${textColor.darkBlue} mb-[20px]`}>Регистрация прошла успешно!</p>
        <Button buttonType="default" title="Авторизоваться" onClickCb={() => navigate(authRoutes.login)} />
      </div>
    </div>
  );
};

export default RegistrationSuccess;
