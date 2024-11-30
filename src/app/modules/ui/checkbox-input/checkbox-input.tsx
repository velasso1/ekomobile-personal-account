import ReactMarkdown from "react-markdown";
import { defaultStyles } from "../../../utils/default-styles";
import { ReactNode } from "react";

interface IProps {
  isMakdownText?: boolean;
  markDownClassname?: string;
  label: string | ReactNode;
  isChecked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
}

const CheckboxInput = ({ isMakdownText, isChecked, label, onChange, id, markDownClassname }: IProps) => {
  return (
    <div className="form-check-lg form-check-solid flex">
      <input className="form-check-input mr-1" type="checkbox" checked={isChecked} onChange={onChange} id={id} />
      <label className="form-check-label">
        {isMakdownText && typeof label === "string" ? (
          <ReactMarkdown children={label} className={markDownClassname ? markDownClassname : ""} />
        ) : (
          <div className={`${defaultStyles.textSize.p14} `}> {label} </div>
        )}
      </label>
    </div>
  );
};

export default CheckboxInput;
