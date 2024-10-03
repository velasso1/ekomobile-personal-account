import { FC } from "react";

interface IHeaderSelectProps {
  label: string;
  addStyle?: string;
  selectStyle?: string;
}

type TempExampleForOption = {
  id: string;
  optionText: string;
  disabled: boolean;
  bold?: boolean;
};

const exampleArr: TempExampleForOption[] = [
  { id: "0", optionText: "Группа 1", disabled: true, bold: true },
  { id: "1", optionText: "+7 (900) 123-45-61", disabled: false },
  { id: "2", optionText: "+7 (900) 123-45-62", disabled: false },
  { id: "3", optionText: "+7 (900) 123-45-63", disabled: false },
  { id: "4", optionText: "Группа 2", disabled: true, bold: true },
  { id: "5", optionText: "+7 (900) 123-45-64", disabled: false },
];

const HeaderSelect: FC<IHeaderSelectProps> = ({ label, addStyle, selectStyle }) => {
  return (
    <div className={`flex flex-wrap items-baseline gap-2.5 rounded-[8px] lg:flex-nowrap ${addStyle}`}>
      <label className="form-label max-w-32 font-medium text-[#161616] xs:hidden md:block">{label}</label>
      <select
        className={`select ml-[-30px] h-[32px] rounded-[8px] hover:cursor-pointer xs:w-[170px] md:w-[230px] ${selectStyle}`}
        name="select"
      >
        {exampleArr.map((itm, idx) => {
          return (
            <option
              className={`${itm.bold ? "font-semibold" : null} hover:cursor-pointer`}
              value={itm.optionText}
              key={itm.id}
              disabled={itm.disabled}
            >
              {itm.optionText}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default HeaderSelect;
