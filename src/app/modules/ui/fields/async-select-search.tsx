import AsyncSelect from "react-select/async";
import { ISelectSearchOption } from "../../../types/gosuslugi-types";

interface IProps {
  containerClass: string;
  inputWidth?: number;
  optionWidth?: number;
  value: ISelectSearchOption;
  id: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  loadOptions: (inputValue: string) => Promise<ISelectSearchOption[]>;
  onChange: (option: ISelectSearchOption) => void;
  noOptionsMessage: ({ inputValue }) => string;
  label: string;
  error: string;
}

const getBorderColor = (isError: boolean, isFocused: boolean) => {
  if (isFocused) {
    return "#1A84FF";
  } else if (isError) {
    return "#DC2626";
  } else {
    return "#C4CADA";
  }
};

const getBorderColorHover = (isError: boolean, isFocused: boolean) => {
  if (isFocused) {
    return "#1A84FF";
  } else if (isError) {
    return "#A6A8B1";
  } else {
    return "#C4CADA";
  }
};

const AsyncSelectSearch = ({
  containerClass,
  inputWidth = 290,
  optionWidth,
  value,
  id,
  onBlur,
  loadOptions,
  onChange,
  noOptionsMessage,
  label,
  error,
}: IProps) => {
  return (
    <div className={containerClass}>
      <label className="mb-[5px] block text-left text-sm font-medium dark:text-white" htmlFor={id}>
        {label}
      </label>
      <AsyncSelect<ISelectSearchOption>
        isClearable
        isSearchable
        cacheOptions
        className={`react-select-styled w-[${inputWidth}px]`}
        classNamePrefix="react-select"
        styles={{
          menu: (baseStyles) => ({
            ...baseStyles,
            width: optionWidth ? optionWidth : baseStyles.width,
          }),
          option: (basestyles) => ({
            ...basestyles,
            fontSize: 12,
            color: "#4B5675",
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: 12,
            color: state.isFocused ? "#4B5675" : "#78829D",
            backgroundColor: "#FCFCFC",
            borderRadius: 6,
            boxShadow: "none",
            borderColor: getBorderColor(Boolean(error), state.isFocused),
            "&:hover": {
              borderColor: getBorderColorHover(Boolean(error), state.isFocused),
            },
          }),
          input: (baseStyles, state) => ({
            ...baseStyles,
            color: "#4B5675",
          }),
          singleValue: (baseStyles, state) => {
            console.log("single option state: ", state);
            return {
              ...baseStyles,
              color: "#78829D",
            };
          },
          noOptionsMessage: (baseStyles) => ({
            ...baseStyles,
            fontSize: 12,
          }),
        }}
        value={value}
        id={id}
        onBlur={onBlur}
        loadOptions={loadOptions}
        onChange={onChange}
        noOptionsMessage={noOptionsMessage}
      />
      {error && <div className="text-[12px] text-red-600">{error}</div>}
    </div>
  );
};

export default AsyncSelectSearch;
