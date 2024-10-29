import {
  IGroup,
  IGUConfirmationPassportField,
  TGUConfirmationCards,
  TGUConfirmationClientGender,
} from "../../../../types/gu-types";
import TextField from "../../../ui/fields/text-field";
import { useFormik } from "formik";
import { RadioInput } from "../../../ui/radio-input";
import PrevNextButtons from "../../../ui/prev-next-buttons/prev-next-buttons";
import * as Yup from "yup";

interface IProps {
  groups: IGroup[];
  setGUCard: React.Dispatch<React.SetStateAction<TGUConfirmationCards>>;
}

interface IStaticTexts {
  card: string;
  fields: IGUConfirmationPassportField[];
}

type TAllowedFormKeys = IGUConfirmationPassportField["id"];
type TFormikPassport = {
  [K in TAllowedFormKeys]: string;
};
type TFormikClientFio = Pick<
  TFormikPassport,
  "birthdate" | "birthplace" | "gender" | "nameFamily" | "nameGiven" | "namePatronymic"
>;

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
};

const genders: TGUConfirmationClientGender[] = ["MALE", "FEMALE"];

const CreateClientFioSchema: Yup.ObjectSchema<TFormikClientFio> = Yup.object().shape({
  nameFamily: Yup.string()
    .matches(/^[\u0400-\u04FF]+$/, "Только кириллица")
    .required("Поле обязательно к заполнению"),
  nameGiven: Yup.string()
    .matches(/^[\u0400-\u04FF]+$/, "Только кириллица")
    .required("Поле обязательно к заполнению"),
  namePatronymic: Yup.string()
    .matches(/^[\u0400-\u04FF]+$/, "Только кириллица")
    .required("Поле обязательно к заполнению"),
  birthdate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Неверный формат даты")
    .test("is-18", "Абонент не может быть младше 18 лет", (value) => {
      const today = new Date();
      const birthDate = new Date(value || "");
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      const dayDifference = today.getDate() - birthDate.getDate();
      return age > 18 || (age === 18 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)));
    })
    .required("Поле обязательно к заполнению"),
  birthplace: Yup.string()
    .matches(/^[\u0400-\u04FF]+$/, "Только кириллица")
    .required("Поле обязательно к заполнению"),
  gender: Yup.string().oneOf(genders, "Нужно выбрать один из двух полов").required("Поле обязательно к заполнению"),
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
  return (
    <>
      <div className="w-[650px] text-[18px] font-semibold">{staticTexts.card}</div>
      <div className="form-group">
        {staticTexts.fields.map((field) => {
          if (field.type !== "radio") {
            return (
              <TextField
                key={field.id}
                Label={field.label}
                id={field.id}
                placeholder={field?.placeholder}
                onChangeCb={(e) => {
                  formik.handleChange(e);
                  formik.setFieldTouched(field.id, true, false);
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

      <div className="radio-list flex flex-col pt-[20px]">
        {staticTexts.fields.map((field) => {
          if (field.type === "radio") {
            return field.options.map((option: { text: string; value: string }) => (
              <RadioInput
                key={option.value}
                name={field.id}
                value={option.value}
                isChecked={formik.values.gender === option.value}
                label={option.text}
                onChange={formik.handleChange}
              />
            ));
          }
        })}
      </div>

      <div className="pt-8">
        <PrevNextButtons nextDisabled={false} prevClick={() => setGUCard("choose-client")} />
      </div>
    </>
  );
};

export default CreateClientFio;
