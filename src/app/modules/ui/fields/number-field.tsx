import React, { FC } from 'react';

interface INumberFieldProps {
  id: string;
  placeholder: string;
  label: string | React.ElementType;
  onChangeCb: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  Icon?: React.ElementType;
  addStyle?: string;
}

const NumberField: FC<INumberFieldProps> = ({
  id,
  placeholder,
  label,
  onChangeCb,
  value,
  Icon,
  addStyle,
}) => {
  return (
    <>
      <label
        className="mb-[5px] block text-left text-sm font-medium dark:text-white"
        htmlFor={id}
      >
        {typeof label === 'string' ? label : null}
      </label>
      {Icon ? (
        <div className="input">
          <input
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
          <Icon />
        </div>
      ) : (
        <input
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
