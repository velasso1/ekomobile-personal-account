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
import useCreateClientFormSync from "../../../../hooks/useCreateClientFormSync";
import { useEffect } from "react";

interface IProps {
  groups: IGroup[];
  setGUCard: React.Dispatch<React.SetStateAction<TGUConfirmationCards>>;
}

interface IStaticTexts {
  card: string;
  fields: IGUConfirmationPassportField[];
  errors: {
    isNotFourCharsLong: string;
    isNotSixCharsLong: string;
    isRequired: string;
    isNotAllowedChar: string;
    isWrongCodeFormat: string;
    isWrongDateFormat: string;
  };
  regex: {
    allowedOnlyDigits: RegExp;
    allowedDigitsAndMinus: RegExp;
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
      mask: "999-999",
    },
    {
      label: "Кем выдан",
      id: "issuePlace",
      type: "text",
    },
    {
      label: "Адрес регистрации (прописка)",
      id: "registrationAddress",
      type: "text",
    },
  ],
  errors: {
    isNotFourCharsLong: "Должно быть ровно 4 символа",
    isNotSixCharsLong: "Должно быть ровно 6 символов",
    isRequired: "Поле обязательно к заполнению",
    isNotAllowedChar: "Только цифры",
    isWrongCodeFormat: "Требуемый формат: 999-999",
    isWrongDateFormat: "Неверный формат даты",
  },
  regex: {
    allowedOnlyDigits: /^\d+$/,
    allowedDigitsAndMinus: /^\d{3}-\d{3}$/,
  },
};

const CreateClientPassportSchema: Yup.ObjectSchema<TFormikClientPassport> = Yup.object().shape({
  number: Yup.string()
    .required(staticTexts.errors.isRequired)
    .matches(staticTexts.regex.allowedOnlyDigits, staticTexts.errors.isNotAllowedChar)
    .length(6, staticTexts.errors.isNotSixCharsLong),
  series: Yup.string()
    .required(staticTexts.errors.isRequired)
    .matches(staticTexts.regex.allowedOnlyDigits, staticTexts.errors.isNotAllowedChar)
    .length(4, staticTexts.errors.isNotFourCharsLong),
  issuePlace: Yup.string(),
  issueDate: Yup.string(),
  issuePlaceCode: Yup.string()
    .required(staticTexts.errors.isRequired)
    .matches(staticTexts.regex.allowedDigitsAndMinus, staticTexts.errors.isWrongCodeFormat),
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
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: CreateClientPassportSchema,
  });

  useEffect(() => {
    console.log(formik.touched);
  }, [formik.touched]);

  const { isNextDisabled } = useCreateClientFormSync(formik);
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
                  if (formik.touched[field.id]) {
                    await formik.validateField(field.id);
                  }
                  // await formik.setFieldTouched(field.id, false);
                }}
                onBlurCb={async (e) => await formik.handleBlur(e)}
                type={field.type}
                value={formik.values[field.id]}
                addStyle="pt-[20px]"
                error={formik.touched[field.id] && formik.errors[field.id] ? formik.errors[field.id] : undefined}
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
