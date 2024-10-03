import { FC } from "react";

import { defaultStyles } from "../../../utils/default-styles";

interface IButtonProps {
  buttonType: "default" | "custom" | "services";
  title: string;
  onClickCb?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  customStyle?: string;
}

const Button: FC<IButtonProps> = ({ buttonType, title, onClickCb, customStyle }) => {
  const { bgColor, textSize, textColor } = defaultStyles;

  return (
    <>
      {buttonType === "default" && (
        <button
          className={`btn w-full justify-center ${textColor.white} ${bgColor.primary}`}
          onClick={(e) => onClickCb(e)}
        >
          {title}
        </button>
      )}

      {buttonType === "custom" && (
        <button className={`btn justify-center ${customStyle}`} onClick={(e) => onClickCb(e)}>
          {title}
        </button>
      )}

      {/* action when click on this btn ?? */}
      {buttonType === "services" && (
        <div className="m-[5px] my-[5px] inline-block">
          <button className="">
            <span className="badge text-[#4B5675]">{title}</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Button;
