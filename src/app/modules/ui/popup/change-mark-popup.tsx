import { FC, useState } from "react";

import { useMutation, useLazyQuery } from "@apollo/client";
import { CHANGE_NUMBER_MARK } from "../../../api/apollo/mutations/change-mark-name";
import { GET_NUMBERS_GROUP } from "../../../api/apollo/queries/get-number-groups";

import { INumbersResponse } from "../../../types/numbers-response-types";

import { IPopupState } from "../tables/table-numbers";

import TextField from "../fields/text-field";
import { Button } from "../button";

import Loader from "../loader/loader";

interface IChangeMarkPopupProps {
  popupData: IPopupState;
  setPopupData: (arg: IPopupState) => void;
}

const ChangeMarkPopUp: FC<IChangeMarkPopupProps> = ({ popupData, setPopupData }) => {
  const [changeMark, { data, loading, error }] = useMutation(CHANGE_NUMBER_MARK, {
    refetchQueries: [GET_NUMBERS_GROUP],
  });

  const [newMark, setNewMark] = useState<string>("");

  const updateNumberMark = (): void => {
    console.log(popupData.tragetMsisdn, newMark);

    if (newMark.length >= 1 && newMark.length <= 20) {
      setPopupData({ ...popupData, showPopup: false });
      changeMark({
        variables: { msisdn: popupData.tragetMsisdn, value: newMark },
      });
      return;
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="absolute left-[45%] top-[30%] z-5">
        <div className="modal-content max-w-[600px] px-[15px] pb-[20px] text-[14px]">
          <div className="modal-header">
            <h3 className="modal-title font-semibold">Изменение описания номера</h3>
            <button
              className="btn-icon btn btn-xs cursor-pointer"
              onClick={() => setPopupData({ ...popupData, showPopup: false })}
            >
              <i className="ki-filled ki-cross"></i>
            </button>
          </div>
          <div className="modal-body">
            <TextField
              type="text"
              Label="Введите новое описание"
              placeholder="например: главный"
              id="change-number-mark"
              value={newMark}
              onChangeCb={(e) => setNewMark(e.target.value)}
              addStyle="mb-[20px]"
            />
            <Button
              disabled={newMark.length < 1}
              buttonType="default"
              title="Изменить"
              onClickCb={() => updateNumberMark()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeMarkPopUp;
