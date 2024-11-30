import { FC } from "react";

import { defaultStyles } from "../../../utils/default-styles";

interface IWarningBadge {
  title?: string;
  message?: string;
  buttonText?: string;
  onClickAction?: () => void;
  isError?: boolean;
}

const WarningBadge: FC<IWarningBadge> = ({ title, message, buttonText, isError, onClickAction }) => {
  const { textSize, textColor } = defaultStyles;

  return (
    <div
      className={`warning mb-[30px] flex h-[68px] w-full flex-row items-center justify-between md:px-[45px] ${isError ? "bg-[#f3adad]" : "bg-[#FFF8DD]"}`}
    >
      <div className="flex items-center justify-between">
        <div className={`warning-icon xs:mr-[10px]`}>
          <i className={`ki-duotone ki-shield-cross text-[30px] ${isError ? "text-[#f33d3d]" : "text-[#F6B100]"}`}></i>
        </div>
        <div className="warning-content flex flex-row">
          <div className="warning-text sm:flex-row">
            <div className={`warning-title font-semibold text-[#252F4A] xs:${textSize.default} md:text-[15px]`}>
              {isError ? "Ошибка" : title}
            </div>
            <div className={`warning-message ${textSize.default} font-medium ${textColor.darkGrey} xs:hidden md:block`}>
              {!message ? "Произошла ошибка при загрузке данных" : message}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="warning-button xs:mr-[20px] sm:mr-[1px] md:mr-[100px]">
          <button
            className={`btn ${isError ? "btn-danger" : "btn-warning"} xs:p-[5px]`}
            onClick={(e) => {
              e.preventDefault();
              if (isError) {
                window.location.reload();
                return;
              }
              onClickAction();
            }}
          >
            {isError ? "Перезагрузить страницу" : buttonText}
          </button>
        </div>
        {!isError && (
          <div className="warning-arrow">
            <i className="ki-filled ki-right text-[28px]"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarningBadge;
