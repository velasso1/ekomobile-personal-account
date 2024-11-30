import { FC } from "react";

import TableServicesModal from "../tables/table-services-modal";

import { IModalProps } from "./modal-balance";
import { ITableServicesModalProps } from "../../../types/servicespage-response-types";

import { defaultStyles } from "../../../utils/default-styles";
import { formatPhoneNumber } from "../../../utils/helpers/phone-formatter";
import { useAppSelector } from "../../../store";

interface IModalServices extends IModalProps {
  tableItem: ITableServicesModalProps;
}

const ModalServices: FC<IModalServices> = ({ modalState, closeModal, tableItem }) => {
  const { textSize } = defaultStyles;

  const { selectedNumber } = useAppSelector((state) => state.userSlice);
  return (
    <div className="fixed left-[40%] top-[25%] z-[2]" data-modal="true" id="modal_27">
      <div className="modal-content top-[20%] max-w-[600px]">
        <div className="modal-header">
          <h3 className="modal-title">Детали платежа</h3>
          <button
            className="btn-icon btn btn-xs btn-light"
            onClick={() => closeModal({ ...modalState, services: false })}
          >
            <i className="ki-filled ki-cross"></i>
          </button>
        </div>
        <div className="modal-body">
          <p className={`py-[20px] pl-[15px] ${textSize.default} font-semibold`}>{formatPhoneNumber(selectedNumber)}</p>
          <TableServicesModal tableItem={tableItem} />
        </div>
      </div>
    </div>
  );
};

export default ModalServices;
