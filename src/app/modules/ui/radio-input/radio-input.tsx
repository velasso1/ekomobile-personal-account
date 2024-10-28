import { ChangeEvent } from "react";

interface IProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
  label: string;
  isChecked: boolean;
}

const RadioInput = ({ name, isChecked, label, onChange, value }: IProps) => {
  return (
    <label className="radio pt-5">
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
