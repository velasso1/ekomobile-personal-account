import { FC } from "react";

import { defaultStyles } from "../../../utils/default-styles";

interface IButtonProps {
  buttonType: "default" | "custom" | "services" | "grayBackgroundBlackText";
  title: string;
  onClickCb?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  customStyle?: string;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = ({ buttonType, title, onClickCb, customStyle, disabled = false }) => {
  const { bgColor, textColor, textSize } = defaultStyles;

  return (
    <>
      {buttonType === "default" && (
        <button
          disabled={disabled}
          className={`btn w-full justify-center ${textColor.white} ${bgColor.primary} ${textSize.p13}`}
          onClick={(e) => onClickCb(e)}
        >
          {title}
        </button>
      )}

      {buttonType === "custom" && (
        <button disabled={disabled} className={`btn justify-center ${customStyle}`} onClick={(e) => onClickCb(e)}>
          {title}
        </button>
      )}

      {buttonType === "grayBackgroundBlackText" && (
        <button
          disabled={disabled}
          className={`btn justify-center border-gray-200 bg-gray-100 ${textColor.greyBlue}`}
          onClick={(e) => onClickCb(e)}
        >
          {title}
        </button>
      )}

      {/* action when click on this btn ?? */}
      {buttonType === "services" && (
        <div className="m-[5px] my-[5px] inline-block">
          <button disabled={disabled} className="">
            <span className={`badge ${textColor.greyBlue}`}>{title}</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Button;
