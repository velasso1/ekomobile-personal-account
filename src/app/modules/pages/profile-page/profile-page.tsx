import { FC, useState, useEffect } from "react";

import { useAppDispatch } from "../../../store";
import { putUserInfo } from "../../../store/slices/userSlice";

import { useQuery, useMutation } from "@apollo/client";
import { GET_PROFILE_DATA } from "../../../api/apollo/queries/get-profile-data";
import { UPDATE_ACCOUNT_INFO } from "../../../api/apollo/mutations/update-account-info";

import TextField from "../../ui/fields/text-field";
import Loader from "../../ui/loader/loader";
import { IProfileInfo } from "../../../types/profile-info-types";
import { Card } from "../../ui/card";
import { PageTitle } from "../../ui/page-title";
import { Button } from "../../ui/button";
import { WarningBadge } from "../../ui";

import { defaultStyles } from "../../../utils/default-styles";
import { useLocation } from "react-router-dom";

const ProfilePage: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { textColor } = defaultStyles;

  const { data, loading, error } = useQuery(GET_PROFILE_DATA);
  const [updateProfileData, { data: updateData, loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_ACCOUNT_INFO);

  const [profileInfo, setProfileInfo] = useState<IProfileInfo>({
    fullName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    sex: "0",
    password: "",
  });

  useEffect(() => {
    if (data) {
      const { userInfo } = data;

      setProfileInfo({
        ...profileInfo,
        fullName: userInfo.account.contactName,
        phoneNumber: userInfo.account.msisdn,
        email: userInfo.account.email,
        dateOfBirth: userInfo.account.birthday,
        sex: userInfo.account.gender,
      });
    }
  }, [data]);

  useEffect(() => {
    dispatch(putUserInfo(profileInfo));
  }, [location.pathname, profileInfo, dispatch]);

  const changeUserInfo = (): void => {
    updateProfileData({
      variables: {
        contactPhone: profileInfo.phoneNumber,
        contactName: profileInfo.fullName,
        email: profileInfo.email,
        birthday: profileInfo.dateOfBirth,
        gender: profileInfo.sex,
      },
    });
  };

  if (loading || updateLoading) {
    return <Loader />;
  }

  return (
    <>
      {updateError ||
        (error && (
          <WarningBadge
            title="Неизвестная ошибка"
            message="Произошла ошибка при загрузке данных, попробуйте позже."
            buttonText="Перезагрузить страницу"
            danger={true}
            onClickAction={() => window.location.reload()}
          />
        ))}

      <div className="h-full w-full xs:p-[18px] md:p-[40px] md:px-[45px]">
        <PageTitle title="Профиль" />
        <Card cardTitle="Основное">
          <>
            <TextField
              id="change-info-fullName"
              type="text"
              Label="ФИО"
              placeholder="фамилия имя отчество"
              value={profileInfo.fullName}
              onChangeCb={(e) =>
                setProfileInfo({
                  ...profileInfo,
                  fullName: e.target.value,
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
              onChangeCb={(e) => {
                setProfileInfo({
                  ...profileInfo,
                  dateOfBirth: e.target.value.trim(),
                });
                console.log(profileInfo.dateOfBirth);
              }}
              addStyle="mt-[15px]"
            />
            <div className="mb-[20px] mt-[15px] flex max-w-32 flex-col items-start">
              <label className={`form-label text-sm font-medium ${textColor.darkGrey}`}>Пол</label>
              <select
                className="select w-[290px] rounded-[8px] hover:cursor-pointer"
                name="select"
                value={profileInfo.sex}
                onChange={(e) => {
                  if (e.target.value === "MALE" || e.target.value === "FEMALE") {
                    setProfileInfo({ ...profileInfo, sex: e.target.value });
                  }
                }}
              >
                <option value="0" disabled>
                  Выберите пол
                </option>
                <option value="MALE">Мужчина</option>
                <option value="FEMALE">Женщина</option>
              </select>
            </div>
            <div className="w-[290px]">
              <Button buttonType="default" title="Сохранить" onClickCb={() => changeUserInfo()} />
            </div>
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
          <div className="w-[290px]">
            <Button buttonType="default" title="Сменить" />
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
