import ReactMarkdown from "react-markdown";

interface IProps {
  isMakdownText?: boolean;
  markDownClassname?: string;
  label: string;
  isChecked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
}

const CheckboxInput = ({ isMakdownText, isChecked, label, onChange, id, markDownClassname }: IProps) => {
  return (
    <div className="form-check-lg form-check-solid flex">
      <input className="form-check-input mr-1" type="checkbox" checked={isChecked} onChange={onChange} id={id} />
      <label className="form-check-label">
        {isMakdownText && <ReactMarkdown children={label} className={markDownClassname ? markDownClassname : ""} />}
      </label>
    </div>
  );
};

export default CheckboxInput;
