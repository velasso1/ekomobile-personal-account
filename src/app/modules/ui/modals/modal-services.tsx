import { FC } from "react";

import { IModalProps } from "./modal-balance";

import TableServicesModal from "../tables/table-services-modal";

import { defaultStyles } from "../../../utils/default-styles";

const ModalServices: FC<IModalProps> = ({modalState, closeModal}) => {
  const { textSize } = defaultStyles;
  return (
    <>
      <div className="absolute top-[25%] left-[40%]" data-modal="true" id="modal_27">
        <div className="modal-content top-[20%] max-w-[600px]">
          <div className="modal-header">
            <h3 className="modal-title">Детали платежа</h3>
            <button className="btn-icon btn btn-xs btn-light" onClick={() => closeModal({...modalState, services: false})}>
              <i className="ki-outline ki-cross"></i>
            </button>
          </div>
          <div className="modal-body">
            <p className={`py-[20px] pl-[15px] ${textSize.default} font-semibold`}>+7 (900) 123-45-67</p>
            <TableServicesModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalServices;
