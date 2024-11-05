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
import maskIssuePlaceCode from "../../../../utils/helpers/maskIssuePlaceCode";
import { useAppSelector } from "../../../../store";
import getIsIssueDateIsValid from "../../../../utils/helpers/getIsIssueDateValid";
import getAge from "../../../../utils/helpers/getAge";

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
    isWrongSeriesFormat: string;
    isWrongNumberFormat: string;
    isWrongCodeFormat: string;
    isWrongDateFormat: string;
    isBeforeFourteenOrAfterTwenty: string;
    isBeforeTwentyOrAfterFortyFive: string;
    isBeforeOrEqualFortyFive: string;
    isNoFuture: string;
  };
  regex: {
    allowedInSeries: RegExp;
    allowedInNumber: RegExp;
    allowedInIssuePlaceCode: RegExp;
    dateFormat: RegExp;
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
    isWrongCodeFormat: 'Требуемый формат: 123-456. "-" добавляется автоматически ',
    isWrongSeriesFormat: "Требуемый формат: 1234. 4 цифры без пробелов",
    isWrongNumberFormat: "Требуемый формат: 123456. 6 цифр без пробелов",
    isWrongDateFormat: "Неверный формат даты",
    isBeforeFourteenOrAfterTwenty: "Дата выдачи не может быть ранньше достижения 14 лет и позднее 20 лет",
    isBeforeTwentyOrAfterFortyFive: "Дата выдачи не может быть раньше или равна достижения 20 лет и поздее 45 лет",
    isBeforeOrEqualFortyFive: "Дата выдачи не может раньше или равна достижения 45 лет",
    isNoFuture: "Дата выдачи не может быть в будущем",
  },
  regex: {
    allowedInNumber: /^\d{6}$/,
    allowedInSeries: /^\d{4}$/,
    allowedInIssuePlaceCode: /^\d{3}-\d{3}$/,
    dateFormat: /^\d{4}-\d{2}-\d{2}$/,
  },
};

const CreateClientPassportSchema = (birthdate: Date): Yup.ObjectSchema<TFormikClientPassport> =>
  Yup.object().shape({
    number: Yup.string()
      .required(staticTexts.errors.isRequired)
      .matches(staticTexts.regex.allowedInNumber, staticTexts.errors.isWrongNumberFormat)
      .length(6, staticTexts.errors.isNotSixCharsLong),
    series: Yup.string()
      .required(staticTexts.errors.isRequired)
      .matches(staticTexts.regex.allowedInSeries, staticTexts.errors.isWrongSeriesFormat)
      .length(4, staticTexts.errors.isNotFourCharsLong),
    issuePlace: Yup.string(),
    issueDate: Yup.string()
      .required(staticTexts.errors.isRequired)
      .matches(staticTexts.regex.dateFormat, staticTexts.errors.isWrongDateFormat)
      .test("is-before-20", staticTexts.errors.isBeforeFourteenOrAfterTwenty, (value) => {
        const age = getAge(birthdate);
        if (age < 20) {
          const issueDate = new Date(value || "");
          return getIsIssueDateIsValid(birthdate, issueDate);
        }
        return true;
      })
      .test("is-before-45", staticTexts.errors.isBeforeTwentyOrAfterFortyFive, (value) => {
        const age = getAge(birthdate);
        if (age >= 20 && age < 45) {
          const issueDate = new Date(value || "");
          return getIsIssueDateIsValid(birthdate, issueDate);
        }
        return true;
      })

      .test("is-after-45", staticTexts.errors.isBeforeOrEqualFortyFive, (value) => {
        const age = getAge(birthdate);
        if (age > 45) {
          const issueDate = new Date(value || "");
          return getIsIssueDateIsValid(birthdate, issueDate);
        }
        return true;
      })
      .test("is-no-future", staticTexts.errors.isNoFuture, (value) => {
        const today = new Date();
        const issueDate = new Date(value || "");
        return today >= issueDate;
      }),
    issuePlaceCode: Yup.string()
      .required(staticTexts.errors.isRequired)
      .matches(staticTexts.regex.allowedInIssuePlaceCode, staticTexts.errors.isWrongCodeFormat),
    registrationAddress: Yup.string(),
  });

const CreateClientPassport = ({ groups, setGUCard }: IProps) => {
  const {
    confirmationPassportRF: {
      passportRF: { birthdate },
    },
  } = useAppSelector((state) => state.gosuslugiSlice);
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
    validationSchema: CreateClientPassportSchema(new Date(birthdate)),
  });

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
                  if (field.id === "issuePlaceCode") {
                    let value = e.target.value;
                    value = maskIssuePlaceCode(value);
                    await formik.setFieldValue(field.id, value);
                  } else {
                    await formik.handleChange(e);
                  }

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
