import { FC } from "react";

import { useQuery } from "@apollo/client";
import { GET_RECOMMENDED_PAYMENT } from "../../../api/apollo/queries/get-recommended-payment";
import { IRecommendedPaymentResponse } from "../../../api/apollo/queries/get-recommended-payment";

import { useAppSelector } from "../../../store";

import Loader from "../loader/loader";
import WarningBadge from "../badges/warning-badge";

import { moneyFormatter } from "../../../utils/helpers/money-formatter";
import { RecommendedPaymentNames } from "../../../utils/auxuliary-data/expenses-names";

export interface IModalProps {
  modalState: { balance: boolean; services: boolean };
  closeModal: (modalState) => void;
}

const ModalBalance: FC<IModalProps> = ({ modalState, closeModal }) => {
  const { selectedNumber } = useAppSelector((state) => state.userSlice);

  const { data, loading, error } = useQuery<IRecommendedPaymentResponse>(GET_RECOMMENDED_PAYMENT, {
    variables: { msisdn: selectedNumber },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <WarningBadge isError={true} />;
  }

  return (
    <div className="fixed left-[45%] top-[30%] z-[2] w-[400px]">
      <div className="modal-content top-[20%] max-w-[600px]">
        <div className="modal-header">
          <h3 className="modal-title font-semibold">Рекомендованный платеж</h3>
          <button
            className="btn-icon btn btn-xs btn-light cursor-pointer"
            onClick={() => closeModal({ ...modalState, balance: false })}
          >
            <i className="ki-filled ki-cross"></i>
          </button>
        </div>
        <div className="modal-body">
          {data?.me.account.billingNumber.recommendedPayment.parts.map((item) => {
            return (
              <div className="" key={crypto.randomUUID()}>
                <span className="badge badge-dot badge-dark mx-[5px] size-2.5" />
                <span>
                  {RecommendedPaymentNames[item.type]}: {moneyFormatter(item.amount)} ₽
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalBalance;
