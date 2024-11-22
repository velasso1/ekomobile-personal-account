import { FC } from "react";

import { ITextFieldProps } from "../../../types/fields-props";

const TextField: FC<ITextFieldProps> = ({
  id,
  type,
  Label,
  placeholder,
  value,
  onChangeCb,
  addStyle,
  customStyle,
  width = "290px",
  error,
  disabled,
  required = true,
  onBlurCb = (e: React.FocusEvent<HTMLInputElement, Element>) => {},
}) => {
  return (
    <div className={`${addStyle}`}>
      <label className="mb-[5px] block text-left text-sm font-medium dark:text-white" htmlFor={id}>
        {typeof Label === "string" ? <p>{Label}</p> : <Label />}
      </label>
      <div className={`input w-[${width}] ${error ? "border-red-600" : ""} `}>
        <input
          className={`${customStyle}`}
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeCb(e)}
          onBlur={(e) => onBlurCb(e)}
          required={required}
          disabled={disabled}
        />
      </div>
      {error && <div className="text-[12px] text-red-600">{error}</div>}
    </div>
  );
};

export default TextField;
