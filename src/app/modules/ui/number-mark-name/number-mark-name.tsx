import { defaultStyles } from "../../../utils/default-styles";

interface IProps {
  numberMarkName?: string;
}

const NumberMarkName = ({ numberMarkName }: IProps) => {
  if (!numberMarkName) {
    return null;
  }
  return <span className={`ml-2 text-[12px] ${defaultStyles.textColor.lightGrey}`}>{`(${numberMarkName})`}</span>;
};

export default NumberMarkName;
