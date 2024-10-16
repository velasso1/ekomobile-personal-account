import { FC, useState } from "react";

import TextField from "../../ui/fields/text-field";
import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";

import { defaultStyles } from "../../../utils/default-styles";

const DetailsPage: FC = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
  });

  const { textColor } = defaultStyles;

  return (
    <div className="h-full w-full px-[45px] xs:p-[18px] md:p-[0] md:px-[45px] md:pt-[40px]">
      <PageTitle title="Детализация" />
      <Card cardTitle="Запрос деталиции">
        <>
          <div className={`details-info pt-[15px] text-[14px] font-medium ${textColor.greyBlue}`}>
            В прошлый раз вы заказывали детализацию: [DATE VARIABLE]
          </div>
          <div className={`details-format py-[15px] text-[14px] font-medium ${textColor.greyBlue}`}>
            Отчет отправляется на электронную почту в формате xlsx
          </div>
          <div className="flex w-[23vw] flex-col">
            <div className="details-select mt-[20px]">
              <label
                className={`form-label mb-[5px] block max-w-32 text-left text-sm font-medium ${textColor.darkGrey} dark:text-white`}
              >
                Период
              </label>
              <select className="select">
                <option value="">[PERIOD VARIABLES]</option>
                <option value="">[PERIOD VARIABLES]</option>
                <option value="">[PERIOD VARIABLES]</option>
                <option value="">[PERIOD VARIABLES]</option>
              </select>
            </div>
            <div className="my-[15px]">
              <TextField
                id="detail-mail"
                type="email"
                placeholder="e-mail"
                value={userInfo.email}
                onChangeCb={(e) => setUserInfo({ email: e.target.value.trim() })}
                Label="Почта"
                width=""
                addStyle=""
              />
            </div>
            <div className="details-select mb-[40px]">
              <label
                className={`form-label mb-[5px] block max-w-32 text-left text-sm font-medium ${textColor.darkGrey} dark:text-white`}
              >
                Формат
              </label>
              <select className="select">
                <option value="">[FORMAT VARIABLES]</option>
                <option value="">[FORMAT VARIABLES]</option>
                <option value="">[FORMAT VARIABLES]</option>
                <option value="">[FORMAT VARIABLES]</option>
              </select>
            </div>
            <Button buttonType="default" title="Создать заявку на детализацию расходов" />
          </div>
        </>
      </Card>
    </div>
  );
};

export default DetailsPage;
