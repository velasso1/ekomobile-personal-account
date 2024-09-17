import { FC } from 'react';

interface IWarningBadge {
  title: string;
  message: string;
  buttonText: string;
}

const WarningBadge: FC<IWarningBadge> = ({ title, message, buttonText }) => {
  return (
    <div className="warning mb-[30px] flex h-[68px] w-full flex-row items-center justify-between bg-[#FFF8DD] px-[45px]">
      <div className="flex items-center">
        <div className="warning-icon mr-[30px]">
          <i className="ki-duotone ki-shield-cross text-[30px] text-[#F6B100]"></i>
        </div>
        <div className="warning-content flex flex-row">
          <div className="warning-text">
            <div className="warning-title text-[15px] font-semibold text-[#252F4A]">
              {title}
            </div>
            <div className="warning-message text-[13px] font-medium text-[#78829D]">
              {message}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="warning-button mr-[100px]">
          <button className="btn btn-warning">{buttonText}</button>
        </div>
        <div className="warning-arrow">
          <i className="ki-filled ki-right text-[28px]"></i>
        </div>
      </div>
    </div>
  );
};

export default WarningBadge;
