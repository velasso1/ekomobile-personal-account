import { FC } from "react";

interface IWarningProps {
  text: string;
}

const Warning: FC<IWarningProps> = ({ text }) => {
  return <span className="badge badge-outline badge-danger mt-[10px]">{text}</span>;
};

export default Warning;
