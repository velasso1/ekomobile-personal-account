import { FC } from "react";

const ModalBalance: FC = () => {
  return (
    <div className="modal" data-modal="true" data-modal-backdrop-static="true" id="modal_5">
      <div className="modal-content top-[25vh] max-w-[600px] px-[15px] pb-[20px] text-[14px]">
        <div className="modal-header">
          <h3 className="modal-title font-semibold">Рекомендованный платеж</h3>
          <button className="btn-icon btn btn-xs" data-modal-dismiss="true">
            <i className="ki-filled ki-cross"></i>
          </button>
        </div>
        <div className="">
          <span className="badge badge-dot badge-dark mx-[5px] size-2.5" />
          <span>Баланс номера: [BALANCE VARIABLE] ₽</span>
        </div>
        <div className="">
          <span className="badge badge-dot badge-dark mx-[5px] size-2.5" />
          <span>Баланс группы номеров: [BALANCE VARIABLE] ₽</span>
        </div>

        <div className="">
          <span className="badge badge-dot badge-dark mx-[5px] size-2.5" />
          <span>Баланс группы номеров: [BALANCE VARIABLE] ₽</span>
        </div>

        <div className="">
          <span className="badge badge-dot badge-dark mx-[5px] size-2.5" />
          <span>Общий баланс: [BALANCE VARIABLE] ₽</span>
        </div>
      </div>
    </div>
  );
};

export default ModalBalance;
