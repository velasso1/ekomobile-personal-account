interface IProps {
  id: string;
  onChange: () => void;
  label: string;
  isChecked: boolean;
}

const RadioInput = ({ id, isChecked, label, onChange }: IProps) => {
  return (
    <label className="radio pt-5">
      <input type="radio" className="mr-1.5" name={id} onChange={() => onChange()} checked={isChecked} />
      {label}
    </label>
  );
};

export default RadioInput;
