import { FC, useState } from "react";

import TextField from "../../ui/fields/text-field";
import { IProfileInfo } from "../../../types/profile-info-types";
import { Card } from "../../ui/card";
import { PageTitle } from "../../ui/page-title";

// import { defaultStyles } from "../../../utils/default-styles";
import { Button } from "../../ui/button";

// import config from '../.././../../../auxuliary.json';

const ProfilePage: FC = () => {
  const [profileInfo, setProfileInfo] = useState<IProfileInfo>({
    fullName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    sex: "0",
    password: "",
  });

  // const { bgColor } = defaultStyles;

  return (
    <div className="h-full w-full xs:p-[18px] md:p-[40px] md:px-[45px]">
      <PageTitle title="Профиль" />
      <Card cardTitle="Основное">
        <>
          {/* {config.profileFields.map((item, index) => {
          return (

          )
        })} */}
          <TextField
            id="change-info-fullName"
            type="text"
            Label="ФИО"
            placeholder="фамилия имя отчество"
            value={profileInfo.fullName}
            onChangeCb={(e) =>
              setProfileInfo({
                ...profileInfo,
                fullName: e.target.value.trim(),
              })
            }
            addStyle="mt-[15px]"
          />
          <TextField
            id="change-info-phone"
            type="text"
            Label="Телефон"
            placeholder="телефон"
            value={profileInfo.phoneNumber}
            onChangeCb={(e) =>
              setProfileInfo({
                ...profileInfo,
                phoneNumber: e.target.value.trim(),
              })
            }
            addStyle="mt-[15px]"
          />
          <TextField
            id="change-info-email"
            type="text"
            Label="Email"
            placeholder="email"
            value={profileInfo.email}
            onChangeCb={(e) =>
              setProfileInfo({
                ...profileInfo,
                email: e.target.value.trim(),
              })
            }
            addStyle="mt-[15px]"
          />

          <TextField
            id="change-info-birth"
            type="date"
            Label="День рождения"
            placeholder="день рождения"
            value={profileInfo.dateOfBirth}
            onChangeCb={(e) =>
              setProfileInfo({
                ...profileInfo,
                dateOfBirth: e.target.value.trim(),
              })
            }
            addStyle="mt-[15px]"
          />
          <div className="mb-[20px] mt-[15px] flex max-w-32 flex-col items-start">
            <label className="form-label text-sm font-medium text-[#161616]">Пол</label>
            <select
              className="select w-[290px] rounded-[8px] hover:cursor-pointer"
              name="select"
              value={profileInfo.sex}
              onChange={(e) => setProfileInfo({ ...profileInfo, sex: e.target.value })}
            >
              <option value="0" disabled>
                Выберите пол
              </option>
              <option value="1">Мужчина</option>
              <option value="2">Женщина</option>
            </select>
          </div>
          <Button buttonType="default" title="Сохранить" />
        </>
      </Card>
      <Card cardTitle="Смена пароля">
        <TextField
          id="change-info-pass"
          type="password"
          Label="Пароль"
          placeholder="пароль"
          value={profileInfo.password}
          onChangeCb={(e) => setProfileInfo({ ...profileInfo, password: e.target.value.trim() })}
          addStyle="mb-[20px]"
        />
        <Button buttonType="default" title="Сменить" />
      </Card>
    </div>
  );
};

export default ProfilePage;
