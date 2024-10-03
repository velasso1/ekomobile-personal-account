import { FC } from "react";

import phoneTube from "../../../assets/images/phone-tube.svg";
import telegram from "../../../assets/images/telegram.svg";
import whatsapp from "../../../assets/images/whatsapp.svg";
import { defaultStyles } from "../../../utils/default-styles";

const ModalHelp: FC = () => {
  const { textSize, textColor } = defaultStyles;

  return (
    <div className="modal" data-modal="true" data-modal-backdrop-static="true" id="modal_4">
      <div className="modal-content top-[25vh] max-w-[600px]">
        <div className="modal-header">
          <h3 className="modal-title text-[14px] font-semibold">Помощь</h3>
          <button className="btn-icon btn btn-xs" data-modal-dismiss="true">
            <i className="ki-filled ki-cross"></i>
          </button>
        </div>
        <div className={`modal-body text-center ${textSize.default} ${textColor.grey}`}>
          Техническая поддержка работает круглосуточно и готова <br />
          ответить на все вопросы в любое время.
          <div className="">С нами можно связаться по телефону или в мессенджерах.</div>
        </div>
        <div className="modal-body text-center font-semibold">
          Свяжись с нами в мессенджерах:
          <div className="mt-[10px] flex justify-center">
            <img className="mr-[10px]" src={telegram} alt="telegram" />
            <img className="" src={whatsapp} alt="whatsapp" />
          </div>
        </div>

        <div className="modal-body text-center font-semibold">
          Позвони
          <div className="my-[10px] flex justify-center">
            <img src={phoneTube} alt="phoneTube" />
            <p className="ml-[10px] font-semibold">0522</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalHelp;
