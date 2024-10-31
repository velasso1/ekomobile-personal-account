import {
  IGroup,
  IGUConfirmationPassportField,
  TFormikClientFio,
  TGUConfirmationCards,
  TGUConfirmationClientGender,
} from "../../../../types/gosuslugi-types";
import TextField from "../../../ui/fields/text-field";
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from "formik";
import { RadioInput } from "../../../ui/radio-input";
import PrevNextButtons from "../../../ui/prev-next-buttons/prev-next-buttons";
import * as Yup from "yup";
import { defaultStyles } from "../../../../utils/default-styles";
import { useEffect, useState } from "react";

interface IProps {
  groups: IGroup[];
  setGUCard: React.Dispatch<React.SetStateAction<TGUConfirmationCards>>;
}

interface IStaticTexts {
  card: string;
  fields: IGUConfirmationPassportField[];
  errors: {
    isTooYoung: string;
    isRequired: string;
    isNotAllowedChar: string;
    isNotAllowedGender: string;
    isWrongDateFormat: string;
  };
  regex: {
    allowedChars: RegExp;
  };
}

const staticTexts: IStaticTexts = {
  card: "Личные данные:",
  fields: [
    {
      label: "Фамилия",
      placeholder: "Иванов",
      id: "nameFamily",
      type: "text",
    },
    {
      label: "Имя",
      placeholder: "Иван",
      id: "nameGiven",
      type: "text",
    },
    {
      label: "Отчество",
      placeholder: "Иванович",
      id: "namePatronymic",
      type: "text",
    },
    {
      label: "Дата рождения",
      placeholder: "01.01.1990",
      id: "birthdate",
      type: "date",
    },
    {
      label: "Место рождения",
      placeholder: "Москва",
      id: "birthplace",
      type: "text",
    },
    {
      label: "Пол",
      id: "gender",
      type: "radio",
      options: [
        {
          text: "Мужской",
          value: "MALE",
        },
        {
          text: "Женский",
          value: "FEMALE",
        },
      ],
    },
  ],
  errors: {
    isTooYoung: "Абонент не может быть младше 18 лет",
    isRequired: "Поле обязательно к заполнению",
    isNotAllowedChar: "Только кириллица",
    isNotAllowedGender: "Нужно выбрать один из двух полов",
    isWrongDateFormat: "Неверный формат даты",
  },
  regex: {
    allowedChars: /^[\u0400-\u04FF-\s.]+$/,
  },
};

const genders: TGUConfirmationClientGender[] = ["MALE", "FEMALE"];

const CreateClientFioSchema: Yup.ObjectSchema<TFormikClientFio> = Yup.object().shape({
  nameFamily: Yup.string()
    .trim()
    .matches(staticTexts.regex.allowedChars, staticTexts.errors.isNotAllowedChar)
    .required(staticTexts.errors.isRequired),
  nameGiven: Yup.string()
    .matches(staticTexts.regex.allowedChars, staticTexts.errors.isNotAllowedChar)
    .required(staticTexts.errors.isRequired),
  namePatronymic: Yup.string().matches(staticTexts.regex.allowedChars, staticTexts.errors.isNotAllowedChar),
  birthdate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, staticTexts.errors.isWrongDateFormat)
    .test("is-18", staticTexts.errors.isTooYoung, (value) => {
      const today = new Date();
      const birthDate = new Date(value || "");
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      const dayDifference = today.getDate() - birthDate.getDate();
      return age > 18 || (age === 18 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)));
    })
    .required(staticTexts.errors.isRequired),
  birthplace: Yup.string()
    .matches(staticTexts.regex.allowedChars, staticTexts.errors.isNotAllowedChar)
    .required(staticTexts.errors.isRequired),
  gender: Yup.string().oneOf(genders, staticTexts.errors.isNotAllowedGender).required(staticTexts.errors.isRequired),
});

const CreateClientFio = ({ groups, setGUCard }: IProps) => {
  const formik = useFormik<TFormikClientFio>({
    initialValues: {
      nameFamily: "",
      nameGiven: "",
      namePatronymic: "",
      birthdate: "",
      birthplace: "",
      gender: "",
    },
    onSubmit: (values) => {},
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: CreateClientFioSchema,
  });

  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    const hasErrors = Object.keys(formik.errors).some((key) => formik.errors[key] && formik.touched[key]);
    setIsNextDisabled(hasErrors);
  }, [formik.errors, formik.touched]);

  return (
    <>
      <div className="w-[650px] text-[18px] font-semibold">{staticTexts.card}</div>
      <div className="form-group">
        {staticTexts.fields.map((field) => {
          if (field.id !== "gender") {
            return (
              <TextField
                key={field.id}
                Label={field.label}
                id={field.id}
                placeholder={field?.placeholder}
                onChangeCb={async (e) => {
                  await formik.handleChange(e);
                  await formik.setFieldTouched(field.id, true);
                }}
                type={field.type}
                value={formik.values[field.id]}
                addStyle="pt-[20px]"
                error={formik.touched[field.id] && formik.errors[field.id] ? formik.errors[field.id] : undefined}
              />
            );
          }
        })}
      </div>

      <div className="pt-[20px]">
        <div className={`${defaultStyles.textSize.p14} font-semibold`}>
          {staticTexts.fields.find((field) => field.id === "gender").label}
        </div>
        <div className="radio-list flex flex-col pt-4">
          {staticTexts.fields.map((field) => {
            if (field.id === "gender" && field.type === "radio") {
              return field.options.map((option: { text: string; value: string }, index: number) => (
                <RadioInput
                  key={option.value}
                  isFirst={index === 0}
                  name={field.id}
                  value={option.value}
                  isChecked={formik.values.gender === option.value}
                  label={option.text}
                  onChange={formik.handleChange}
                />
              ));
            }
          })}
          {formik.errors.gender && formik.touched.gender && (
            <div className="text-[12px] text-red-600">{formik.errors.gender}</div>
          )}
        </div>
      </div>

      <div className="pt-8">
        <PrevNextButtons
          nextDisabled={isNextDisabled}
          prevClick={() => setGUCard("choose-client")}
          nextClick={async () => {
            const errors = await formik.validateForm();
            if (Object.keys(errors).length === 0) {
              setGUCard("create-client-passport");
            } else {
              formik.setTouched(setNestedObjectValues<FormikTouched<FormikValues>>(errors, true));
            }
          }}
        />
      </div>
    </>
  );
};

export default CreateClientFio;
