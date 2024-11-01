import {
  IGroup,
  IGUConfirmationPassportField,
  TFormikClientPassport,
  TGUConfirmationCards,
} from "../../../../types/gosuslugi-types";
import TextField from "../../../ui/fields/text-field";
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from "formik";
import PrevNextButtons from "../../../ui/prev-next-buttons/prev-next-buttons";
import * as Yup from "yup";
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
  card: "Паспортные данные:",
  fields: [
    {
      label: "Серия",
      placeholder: "",
      id: "series",
      type: "text",
    },
    {
      label: "Номер",
      placeholder: "",
      id: "number",
      type: "text",
    },
    {
      label: "Дата выдачи",
      placeholder: "",
      id: "issueDate",
      type: "date",
    },
    {
      label: "Код подразделения",
      placeholder: "",
      id: "issuePlaceCode",
      type: "text",
    },
    {
      label: "Кем выдан",
      id: "issuePlace",
      type: "text",
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

const CreateClientPassportSchema: Yup.ObjectSchema<TFormikClientPassport> = Yup.object().shape({
  number: Yup.string(),
  series: Yup.string(),
  issuePlace: Yup.string(),
  issueDate: Yup.string(),
  issuePlaceCode: Yup.string(),
  registrationAddress: Yup.string(),
});

const CreateClientPassport = ({ groups, setGUCard }: IProps) => {
  const formik = useFormik<TFormikClientPassport>({
    initialValues: {
      issueDate: "",
      issuePlace: "",
      issuePlaceCode: "",
      number: "",
      registrationAddress: "",
      series: "",
    },
    onSubmit: (values) => {},
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: CreateClientPassportSchema,
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
                mask={""}
              />
            );
          }
        })}
      </div>

      <div className="pt-8">
        <PrevNextButtons
          nextDisabled={isNextDisabled}
          prevClick={() => setGUCard("create-client-fio")}
          nextClick={async () => {
            const errors = await formik.validateForm();
            if (Object.keys(errors).length === 0) {
              // go create client passportRF
            } else {
              formik.setTouched(setNestedObjectValues<FormikTouched<FormikValues>>(errors, true));
            }
          }}
        />
      </div>
    </>
  );
};

export default CreateClientPassport;
