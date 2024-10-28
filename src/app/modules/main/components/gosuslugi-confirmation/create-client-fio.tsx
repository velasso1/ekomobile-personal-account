import { IGroup, TGUConfirmationCards } from "../../../../types/gu-types";
import TextField from "../../../ui/fields/text-field";
import { useFormik } from "formik";
import { RadioInput } from "../../../ui/radio-input";
import PrevNextButtons from "../../../ui/prev-next-buttons/prev-next-buttons";

interface IProps {
  groups: IGroup[];
  setGUCard: React.Dispatch<React.SetStateAction<TGUConfirmationCards>>;
}

const staticTexts = {
  card: "Личные данные:",
  fields: {
    nameFamily: {
      label: "Фамилия",
      placeholder: "Иванов",
    },
    nameGiven: {
      label: "Имя",
      placeholder: "Иван",
    },
    namePatronymic: {
      label: "Отчество",
      placeholder: "Иванович",
    },
    birthDate: {
      label: "Дата рождения",
      placeholder: "01.01.1990",
    },
    birthPlace: {
      label: "Место рождения",
      placeholder: "Москва",
    },
    gender: {
      label: "Пол",
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
  },
};

const CreateClientFio = ({ groups, setGUCard }: IProps) => {
  const formik = useFormik({
    initialValues: {
      nameFamily: "",
      nameGiven: "",
      namePatronymic: "",
      birthDate: "",
      birthPlace: "",
      gender: "",
    },
    onSubmit: (values) => {},
  });
  return (
    <>
      <div className="w-[650px] text-[18px] font-semibold">{staticTexts.card}</div>
      <TextField
        Label={staticTexts.fields.nameFamily.label}
        id={"nameFamily"}
        placeholder={staticTexts.fields.nameFamily.placeholder}
        onChangeCb={formik.handleChange}
        type="text"
        value={formik.values.nameFamily}
        addStyle="pt-[30px]"
      />

      <TextField
        Label={staticTexts.fields.nameGiven.label}
        id={"nameGiven"}
        placeholder={staticTexts.fields.nameGiven.placeholder}
        onChangeCb={formik.handleChange}
        type="text"
        value={formik.values.nameGiven}
        addStyle="pt-[20px]"
      />

      <TextField
        Label={staticTexts.fields.namePatronymic.label}
        id={"namePatronymic"}
        placeholder={staticTexts.fields.namePatronymic.placeholder}
        onChangeCb={formik.handleChange}
        type="text"
        value={formik.values.namePatronymic}
        addStyle="pt-[20px]"
      />

      <TextField
        Label={staticTexts.fields.birthDate.label}
        id={"birthDate"}
        placeholder={staticTexts.fields.birthDate.placeholder}
        onChangeCb={formik.handleChange}
        type="date"
        value={formik.values.birthDate}
        addStyle="pt-[20px]"
      />

      <TextField
        Label={staticTexts.fields.birthPlace.label}
        id={"birthPlace"}
        placeholder={staticTexts.fields.birthPlace.placeholder}
        onChangeCb={formik.handleChange}
        type="text"
        value={formik.values.birthPlace}
        addStyle="pt-[20px]"
      />

      <div className="radio-list flex flex-col pt-[20px]">
        {staticTexts.fields.gender.options.map((option: { text: string; value: string }) => (
          <RadioInput
            key={option.value}
            name="gender"
            value={option.value}
            isChecked={formik.values.gender === option.value}
            label={option.text}
            onChange={formik.handleChange}
          />
        ))}
      </div>

      <div className="pt-8">
        <PrevNextButtons nextDisabled={false} prevClick={() => setGUCard("choose-client")} />
      </div>
    </>
  );
};

export default CreateClientFio;
