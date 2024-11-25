import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import NumberField from "../../../ui/fields/number-field";
import { Button } from "../../../ui/button";

import { defaultStyles } from "../../../../utils/default-styles";
import { authRoutes } from "../../../../utils/routes-name/main-routes";

const RecoveryPassForm: FC = () => {
  const navigate = useNavigate();

  const [userPhone, setUserPhone] = useState<number | "">("");
  const { bgColor, textSize, textColor } = defaultStyles;

  return (
    <div className="flex min-w-[370px] flex-col items-center justify-center rounded-[12px] border-2 py-10 text-center">
      <p className={`text-lg font-semibold ${textColor.darkBlue}`}>Забыли пароль?</p>
      <p className={`${textSize.default} font-medium ${textColor.grey}`}>
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
      <div className="mt-[15px] flex w-[290px] justify-between">
        <Button buttonType="default" title="Отправить" onClickCb={() => navigate(authRoutes.recoverySuccess)} />
        <Button
          buttonType="custom"
          title="Отмена"
          customStyle={`w-full ml-[12px] border-[#F1F1F4] ${bgColor.white}`}
          onClickCb={() => navigate(authRoutes.login)}
        />
      </div>
    </div>
  );
};

export default RecoveryPassForm;
