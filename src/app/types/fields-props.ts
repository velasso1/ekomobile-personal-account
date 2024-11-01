export interface ITextFieldProps {
  id: string;
  type: string;
  Label: string | React.ElementType;
  placeholder: string;
  value: string;
  onChangeCb: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addStyle?: string;
  width?: string;
  disabled?: boolean;
  error?: string;
  mask?: string;
  required?: boolean;
}

export interface INumberFieldProps {
  id: string;
  placeholder: string;
  label: string | React.ElementType;
  onChangeCb: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  Icon?: React.ElementType;
  addStyle?: string;
  disabled?: boolean;
}
