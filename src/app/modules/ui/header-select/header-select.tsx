import { FC, useState, useEffect } from "react";

import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_NUMBERS_GROUP } from "../../../api/apollo/queries/get-number-groups";
import { GET_CURRENT_USER_DATA } from "../../../api/apollo/queries/get-profile-data";

import { useAppDispatch, useAppSelector } from "../../../store";
import { changeSelectedNumber } from "../../../store/slices/user-slice";
import { newDataReceived } from "../../../store/slices/user-slice";

import { INumbersResponse } from "../../../types/numbers-response-types";
import { ICurrentDataResponse } from "../../../types/new-current-data-types";

import Loader from "../loader/loader";
import HeaderSelectOption from "./header-select-option";

import { defaultStyles } from "../../../utils/default-styles";
import WarningBadge from "../badges/warning-badge";
import { formatPhoneNumber } from "../../../utils/helpers/phone-formatter";
// import { dateFormatter } from "../../../utils/helpers/date-formatter";

interface IHeaderSelectProps {
  label: string;
  addStyle?: string;
  selectStyle?: string;
}

const HeaderSelect: FC<IHeaderSelectProps> = ({ label, addStyle, selectStyle }) => {
  const dispatch = useAppDispatch();

  const date = new Date();

  const [getAnotherNumberData, { data: anotherData, loading: anotherLoading, error: adnotherError }] =
    useLazyQuery<ICurrentDataResponse>(GET_CURRENT_USER_DATA);

  const { data, loading, error } = useQuery<INumbersResponse>(GET_NUMBERS_GROUP);

  const { selectedNumber } = useAppSelector((state) => state.userSlice);

  // const [accountMsisdn, setMsidn] = useState(formatPhoneNumber(selectedNumber) ?? "");

  useEffect(() => {
    if (selectedNumber) {
      getAnotherNumberData({
        fetchPolicy: "no-cache",
        variables: {
          msisdn: selectedNumber,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
        },
      });
    }
  }, []);

  useEffect(() => {
    // dispatch(changeSelectedNumber(data.me.account.number.));
  }, []);

  // useEffect(() => {
  //   setMsidn(formatPhoneNumber(selectedNumber));
  // }, [selectedNumber]);

  useEffect(() => {
    if (anotherData) {
      dispatch(newDataReceived(anotherData));
    }
  }, [anotherData, dispatch]);

  const { textColor } = defaultStyles;

  if (error || adnotherError) {
    return <WarningBadge isError={true} />;
  }

  return (
    <>
      {(loading || anotherLoading) && <Loader />}
      <div className={`flex flex-wrap items-baseline gap-2.5 rounded-[8px] lg:flex-nowrap ${addStyle}`}>
        <label className={`form-label max-w-32 font-medium ${textColor.darkGrey} xs:hidden md:block`}>{label}</label>
        <select
          className={`select ml-[-30px] h-[32px] rounded-[8px] hover:cursor-pointer xs:w-[170px] md:w-[230px] ${selectStyle}`}
          name="select"
          onChange={(e) => {
            dispatch(changeSelectedNumber(e.target.value));
            getAnotherNumberData({
              fetchPolicy: "no-cache",
              variables: {
                msisdn: e.target.value,
                year: date.getFullYear(),
                month: date.getMonth() + 1,
              },
            });
          }}
          value={selectedNumber}
        >
          {data?.me.account.number.groups.length > 0 ? (
            data.me.account.number.groups.map((item) => {
              return (
                <>
                  <option key={crypto.randomUUID()} value="" disabled>
                    {item.defaultName}
                  </option>
                  <HeaderSelectOption key={item.id} item={item} />;
                </>
              );
            })
          ) : (
            <option>{formatPhoneNumber(selectedNumber)}</option>
          )}
        </select>
      </div>
    </>
  );
};

export default HeaderSelect;
