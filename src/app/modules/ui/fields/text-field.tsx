import React, { FC } from "react";

interface ITextFieldProps {
  id: string;
  type: string;
  Label: string | React.ElementType;
  placeholder: string;
  value: string;
  onChangeCb: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addStyle?: string;
  width?: string;
}

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
