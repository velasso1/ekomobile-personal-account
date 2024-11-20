import { FC, useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store";
import { putUserInfo } from "../../../store/slices/user-slice";

import { useQuery, useMutation } from "@apollo/client";
import { GET_PROFILE_DATA } from "../../../api/apollo/queries/get-profile-data";
import { UPDATE_ACCOUNT_INFO } from "../../../api/apollo/mutations/update-account-info";

import { IProfileInfo } from "../../../types/profile-info-types";
import { IChangePasswordState } from "../../../types/change-password-types";

import { Card } from "../../ui/card";
import { WarningBadge } from "../../ui";
import { Button } from "../../ui/button";
import Loader from "../../ui/loader/loader";
import Warning from "../../ui/warning/warning";
import { PageTitle } from "../../ui/page-title";
import TextField from "../../ui/fields/text-field";
// import ChangePasswordForm from "./change-password-form/change-password-form";
import SecretKeyForm from "./change-password-form/secret-code-form";

import { defaultStyles } from "../../../utils/default-styles";

const ProfilePage: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { textColor } = defaultStyles;

  const { data, loading, error } = useQuery(GET_PROFILE_DATA);
  const [updateProfileData, { data: updateData, loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_ACCOUNT_INFO);

  const [passwordChange, setPasswordChange] = useState<IChangePasswordState>({
    newPassword: "",
    repeatNewPassword: "",
    secretKey: "",
  });

  const [profileInfo, setProfileInfo] = useState<IProfileInfo>({
    fullName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    sex: "NOTSELECTED",
    password: "",
  });
  const [fieldError, setFieldError] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const { userInfo } = data;

      setProfileInfo({
        ...profileInfo,
        fullName: userInfo.account.contactName,
        phoneNumber: userInfo.account.msisdn,
        email: userInfo.account.email,
        dateOfBirth: userInfo.account.birthday,
        sex: userInfo.account.gender ?? "NOTSELECTED",
      });
    }
  }, [data]);

  useEffect(() => {
    dispatch(putUserInfo(profileInfo));
  }, [location.pathname, profileInfo, dispatch]);

  const checkFields = (): void => {
    setFieldError(false);
    for (const key in profileInfo) {
      if (key === "password") {
        continue;
      }

      if (profileInfo[key] === "") {
        setFieldError(true);
        return;
      }
    }

    changeUserInfo();
  };

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

  if (updateError || error) {
    return <WarningBadge isError={true} />;
  }

  return (
    <div className="h-full w-full xs:p-[18px] md:p-[40px] md:px-[45px]">
      <PageTitle title="Профиль" />
      <Card cardTitle="Основное">
        {fieldError && <Warning text="Заполните все поля" />}
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
              <option value="NOTSELECTED" disabled>
                Выберите пол
              </option>
              <option value="MALE">Мужчина</option>
              <option value="FEMALE">Женщина</option>
            </select>
          </div>
          <div className="w-[290px]">
            <Button buttonType="default" title="Сохранить" onClickCb={() => checkFields()} />
          </div>
        </>
      </Card>
      <Card cardTitle="Смена пароля">
        <SecretKeyForm passState={passwordChange} passChange={setPasswordChange} />
      </Card>
    </div>
  );
};

export default ProfilePage;
