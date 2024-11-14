import {
<<<<<<< HEAD
  IGroup,
=======
>>>>>>> stage
  IGUConfirmationPassportField,
  ISelectSearchOption,
  ISSUE_PLACE_MANUAL,
  TFormikClientPassport,
  TGUConfirmationCards,
  TGUConfirmationPassportFieldId,
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
import { getSuggestAddress, getSuggestIssuePlace } from "../../../../api/axios/dadata";
import AsyncSelectSearch from "../../../ui/fields/async-select-search";
import { useEffect, useState } from "react";
import PreviewClientData from "./preview-client-data";
<<<<<<< HEAD

interface IProps {
  groups: IGroup[];
=======
import useGetGosuslugiData from "../../../../hooks/useGetGosuslugiData";

interface IProps {
>>>>>>> stage
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

const ISSSUE_PLACE_CODE_LENGTH_UI = 7;

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
      type: "select",
      options: [
        {
          label: "--- пожалуйста выберите ---",
          value: "",
        },
        {
          label: "Ввести адрес вручную",
          value: ISSUE_PLACE_MANUAL,
        },
      ],
    },
    {
      label: "Кем выдан (ручной ввод)",
      id: "issuePlaceManual",
      type: "text",
    },
    {
      label: "Адрес регистрации (прописка)",
      id: "registrationAddress",
      noOptionsMessageEmpty: "Пожалуйста начните вводить адрес",
      noOptionsMessageWrong: "Не нашли такой адрес:",
      type: "asyncSelect",
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
    issuePlaceManual: Yup.string(),
    issuePlaceCode: Yup.string().matches(
      staticTexts.regex.allowedInIssuePlaceCode,
      staticTexts.errors.isWrongCodeFormat
    ),
    registrationAddress: Yup.string().required(staticTexts.errors.isRequired),
  });

<<<<<<< HEAD
const CreateClientPassport = ({ groups, setGUCard }: IProps) => {
=======
const CreateClientPassport = ({ setGUCard }: IProps) => {
>>>>>>> stage
  const {
    passportRF: { birthdate },
  } = useAppSelector((state) => state.gosuslugiSlice);
  const [issuePlaceOptions, setIssuePlaceOptions] = useState<{ label: string; value: string }[]>([]);

<<<<<<< HEAD
=======
  const { conformationRequiredNumbers } = useGetGosuslugiData();

>>>>>>> stage
  const formik = useFormik<TFormikClientPassport>({
    initialValues: {
      issueDate: "",
      issuePlace: "",
      issuePlaceCode: "",
      issuePlaceManual: "",
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
  const getIsShowIssuePlaceManual = (fieldId: TGUConfirmationPassportFieldId) =>
    fieldId === "issuePlaceManual" && formik.values.issuePlace !== ISSUE_PLACE_MANUAL;
  useEffect(() => {
    if (formik.values.issuePlaceCode.length === ISSSUE_PLACE_CODE_LENGTH_UI) {
      const staticOptions = staticTexts.fields.find((field) => field.type === "select").options;
      getSuggestIssuePlace(formik.values.issuePlaceCode).then((result) =>
        setIssuePlaceOptions([...staticOptions, ...result])
      );
    } else {
      setIssuePlaceOptions([]);
      formik.setFieldValue("issuePlace", "");
    }
  }, [formik.values.issuePlaceCode]);

  return (
    <>
      <div className="w-[650px] text-[18px] font-semibold">{staticTexts.card}</div>
      <div className="flex">
        <div className="form-group mr-10 w-[290px]">
          {staticTexts.fields.map((field) => {
            if (field.type === "text" || field.type === "date") {
              if (getIsShowIssuePlaceManual(field.id)) {
                return null;
              }
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
                  }}
                  onBlurCb={async (e) => await formik.handleBlur(e)}
                  type={field.type}
                  value={formik.values[field.id]}
                  addStyle="pt-[20px]"
                  error={formik.touched[field.id] && formik.errors[field.id] ? formik.errors[field.id] : undefined}
                  disabled={getIsShowIssuePlaceManual(field.id)}
                />
              );
            } else if (field.type === "asyncSelect") {
              return (
                <AsyncSelectSearch
                  containerClass="pt-8"
                  error={formik.touched[field.id] && formik.errors[field.id] ? formik.errors[field.id] : undefined}
                  id={field.id}
                  label={field.label}
                  loadOptions={getSuggestAddress}
                  key={field.id}
                  optionWidth={350}
                  noOptionsMessage={({ inputValue }) =>
                    inputValue ? `${field.noOptionsMessageWrong} ${inputValue}` : field.noOptionsMessageEmpty
                  }
                  onChange={async (option: ISelectSearchOption) => {
                    if (option?.label && option?.value) {
                      await formik.setFieldValue(field.id, option?.label);
                    } else {
                      await formik.setFieldValue(field.id, "");
                      await formik.setFieldTouched(field.id, true);
                    }
                    if (formik.touched[field.id]) {
                      await formik.validateField(field.id);
                    }
                  }}
                  value={{
                    label: formik.values[field.id],
                    value: formik.values[field.id],
                  }}
                  onBlur={formik.handleBlur}
                />
              );
            } else if (field.type === "select") {
              return (
                <div key={field.id} className="pt-[20px]">
                  <label className="mb-[5px] block text-left text-sm font-medium dark:text-white">{field.label}</label>
                  <select
                    id={field.id}
                    className="input w-[290px]"
                    onChange={formik.handleChange}
                    value={formik.values[field.id]}
                    disabled={formik.values.issuePlaceCode.length !== ISSSUE_PLACE_CODE_LENGTH_UI}
                  >
                    {issuePlaceOptions.map((opt, index) => {
                      return (
                        <option key={opt.label} value={opt.value} disabled={index === 0}>
                          {opt.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            }
          })}
        </div>
<<<<<<< HEAD
        <div className="pt-[20px]">
          <PreviewClientData />
=======
        <div className="pt-11">
          <PreviewClientData containerClass="card p-8 w-[550px]" />
>>>>>>> stage
        </div>
      </div>
      <div className="pt-8">
        <PrevNextButtons
          nextDisabled={isNextDisabled}
          prevClick={() => setGUCard("create-client-fio")}
          nextClick={async () => {
            const errors = await formik.validateForm();
            if (Object.keys(errors).length === 0) {
<<<<<<< HEAD
              // go create client passportRF
=======
              // TODO: change condition when there is real data
              if (conformationRequiredNumbers.length > 0) {
                setGUCard("choose-numbers");
              }
>>>>>>> stage
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
