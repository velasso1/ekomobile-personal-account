import { FC } from "react";
import { defaultStyles } from "../../../utils/default-styles";

interface IWarningBadge {
  title: string;
  message: string;
  buttonText: string;
}

const WarningBadge: FC<IWarningBadge> = ({ title, message, buttonText }) => {
  const { textSize, textColor } = defaultStyles;

  return (
    <div className="warning mb-[30px] flex h-[68px] w-full flex-row items-center justify-between bg-[#FFF8DD] md:px-[45px]">
      <div className="flex items-center justify-between">
        <div className="warning-icon xs:mr-[10px]">
          <i className="ki-duotone ki-shield-cross text-[30px] text-[#F6B100]"></i>
        </div>
        <div className="warning-content flex flex-row">
          <div className="warning-text sm:flex-row">
            <div className={`warning-title font-semibold text-[#252F4A] xs:${textSize.default} md:text-[15px]`}>
              {title}
            </div>
            <div className={`warning-message ${textSize.default} font-medium ${textColor.grey} xs:hidden md:block`}>
              {message}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="warning-button xs:mr-[20px] sm:mr-[1px] md:mr-[100px]">
          <button className="btn btn-warning xs:p-[5px]">{buttonText}</button>
        </div>
        <div className="warning-arrow">
          <i className="ki-filled ki-right text-[28px]"></i>
        </div>
      </div>
    </div>
  );
};

export default WarningBadge;
