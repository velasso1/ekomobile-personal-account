import {
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
import useCreateClientFormSync from "../../../../hooks/useCreateClientFormSync";
import getAge from "../../../../utils/helpers/getAge";

interface IProps {
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
    dateFormat: RegExp;
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
    dateFormat: /^\d{4}-\d{2}-\d{2}$/,
  },
};

const genders: TGUConfirmationClientGender[] = ["MALE", "FEMALE"];

const CreateClientFioSchema: Yup.ObjectSchema<TFormikClientFio> = Yup.object().shape({
  nameFamily: Yup.string()
    .required(staticTexts.errors.isRequired)
    .matches(staticTexts.regex.allowedChars, staticTexts.errors.isNotAllowedChar),
  nameGiven: Yup.string()
    .required(staticTexts.errors.isRequired)
    .matches(staticTexts.regex.allowedChars, staticTexts.errors.isNotAllowedChar),
  namePatronymic: Yup.string().matches(staticTexts.regex.allowedChars, staticTexts.errors.isNotAllowedChar),
  birthdate: Yup.string()
    .required(staticTexts.errors.isRequired)
    .matches(staticTexts.regex.dateFormat, staticTexts.errors.isWrongDateFormat)
    .test("is-18", staticTexts.errors.isTooYoung, (value) => {
      const birthdate = new Date(value || "");
      const age = getAge(birthdate);
      return age >= 18;
    }),
  birthplace: Yup.string()
    .required(staticTexts.errors.isRequired)
    .matches(staticTexts.regex.allowedChars, staticTexts.errors.isNotAllowedChar),
  gender: Yup.string().required(staticTexts.errors.isRequired).oneOf(genders, staticTexts.errors.isNotAllowedGender),
});

const CreateClientFio = ({ setGUCard }: IProps) => {
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

  const { isNextDisabled } = useCreateClientFormSync(formik);

  return (
    <>
      <div className="w-[650px] text-[18px] font-semibold">{staticTexts.card}</div>
      <div className="form-group">
        {staticTexts.fields.map((field) => {
          if (field.type === "date" || field.type === "text") {
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
                onBlurCb={async (e) => await formik.handleBlur(e)}
                type={field.type}
                value={formik.values[field.id]}
                addStyle="pt-[20px]"
                error={formik.touched[field.id] && formik.errors[field.id] ? formik.errors[field.id] : undefined}
              />
            );
          } else if (field.type === "radio") {
            return (
              <div className="pt-[20px]" key={field.id}>
                <div className={`${defaultStyles.textSize.p14} font-semibold`}>{field.label}</div>
                <div className="radio-list flex flex-col pt-4">
                  {field.options.map((option: { text: string; value: string }, index: number) => (
                    <RadioInput
                      key={option.value}
                      isFirst={index === 0}
                      name={field.id}
                      value={option.value}
                      isChecked={formik.values.gender === option.value}
                      label={option.text}
                      onChange={formik.handleChange}
                    />
                  ))}
                  {formik.errors.gender && formik.touched.gender && (
                    <div className="text-[12px] text-red-600">{formik.errors.gender}</div>
                  )}
                </div>
              </div>
            );
          }
        })}
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
