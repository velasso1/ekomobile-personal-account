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
  width = "290px",
}) => {
  return (
    <div className={`${addStyle}`}>
      <label className="mb-[5px] block text-left text-sm font-medium dark:text-white" htmlFor={id}>
        {typeof Label === "string" ? <p>{Label}</p> : <Label />}
      </label>
      <div className={`input w-[${width}]`}>
        <input
          className=""
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeCb(e)}
          required
        />
      </div>
    </div>
  );
};

export default TextField;
