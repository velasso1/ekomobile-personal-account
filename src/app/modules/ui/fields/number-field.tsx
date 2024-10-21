import { FC } from "react";

import { INumberFieldProps } from "../../../types/fields-props";

const NumberField: FC<INumberFieldProps> = ({
  id,
  placeholder,
  label,
  onChangeCb,
  value,
  Icon,
  addStyle,
  disabled = false,
}) => {
  return (
    <>
      <label className="mb-[5px] block text-left text-sm font-medium dark:text-white" htmlFor={id}>
        {typeof label === "string" ? label : null}
      </label>
      {Icon ? (
        <div className="input">
          <input
            disabled={disabled}
            type="number"
            id={id}
            className={`[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${addStyle}`}
            placeholder={placeholder}
            onChange={(e) => {
              e.preventDefault();
              onChangeCb(e);
            }}
            value={value}
            required
          />

          {value.toString().length > 10 && <Icon />}
        </div>
      ) : (
        <input
          disabled={disabled}
          type="number"
          id={id}
          className={`input mb-[10px] block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${addStyle}`}
          placeholder={placeholder}
          onChange={(e) => {
            e.preventDefault();
            onChangeCb(e);
          }}
          value={value}
          required
        />
      )}
    </>
  );
};

export default NumberField;
