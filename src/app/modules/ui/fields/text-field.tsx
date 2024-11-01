import { FC } from "react";
import InputMask from "react-input-mask";

import { ITextFieldProps } from "../../../types/fields-props";

const TextField: FC<ITextFieldProps> = ({
  id,
  type,
  Label,
  placeholder,
  value,
  onChangeCb,
  addStyle,
  width = "290px",
  error,
  disabled,
  mask,
  required = true,
}) => {
  return (
    <div className={`${addStyle}`}>
      <label className="mb-[5px] block text-left text-sm font-medium dark:text-white" htmlFor={id}>
        {typeof Label === "string" ? <p>{Label}</p> : <Label />}
      </label>
      <div className={`input w-[${width}] ${error ? "border-red-600" : ""} `}>
        <InputMask
          className=""
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeCb(e)}
          required={required}
          disabled={disabled}
          mask={mask}
        />
      </div>
      {error && <div className="text-[12px] text-red-600">{error}</div>}
    </div>
  );
};

export default TextField;
