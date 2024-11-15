import { ChangeEvent } from "react";
import { defaultStyles } from "../../../utils/default-styles";

interface IProps {
  name?: string;
  id?: unknown;
  value?: string;
  onChange: (e: ChangeEvent<any>) => void;
  label: string;
  isChecked: boolean;
  isFirst?: boolean;
}

const RadioInput = ({ name, isChecked, label, onChange, value, isFirst }: IProps) => {
  return (
    <label className={`radio ${isFirst ? "" : "pt-5"} ${defaultStyles.textSize.p14}`}>
      <input
        type="radio"
        className="mr-1.5"
        name={name}
        onChange={(e) => onChange(e)}
        checked={isChecked}
        value={value}
      />
      {label}
    </label>
  );
};

export default RadioInput;
