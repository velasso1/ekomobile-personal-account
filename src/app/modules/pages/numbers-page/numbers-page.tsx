import { FC, useEffect } from "react";

import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_NUMBERS_GROUP } from "../../../api/apollo/queries/get-number-groups";
import { GET_FULL_DATA } from "../../../api/apollo/queries/get-full-data";

import { IFullDataInfo } from "../../../types/response-full-userinfo-types";

import { INumbersResponse } from "../../../types/numbers-response-types";

import Loader from "../../ui/loader/loader";
import { WarningBadge } from "../../ui";
import TableNumbers from "../../ui/tables/table-numbers";
import { PageTitle } from "../../ui/page-title";

const NumbersPage: FC = () => {
  const { data, loading, error } = useQuery<INumbersResponse>(GET_NUMBERS_GROUP, { fetchPolicy: "no-cache" });

  const [getFullData, { data: fullData, loading: fullLoading, error: fullError }] =
    useLazyQuery<IFullDataInfo>(GET_FULL_DATA);

  useEffect(() => {
    if (data?.me.account.number.groups.length === 0) {
      getFullData({
        variables: {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
        },
      });
    }
  }, [data]);

  if (loading || fullLoading) {
    return <Loader />;
  }

  if (error || fullError) {
    return <WarningBadge isError={true} />;
  }

  return (
    <div className="mb-[40px] h-full w-full pl-[45px] pt-[40px]">
      <PageTitle title="Дочерние номера" />

      {data.me.account.number.groups.length !== 0 ? (
        data.me.account.number.groups.map((item) => {
          return (
            <TableNumbers
              key={item.id}
              tableName={item.defaultName}
              tableItem={item}
              pricePlan={data.me.account.number.pricePlan}
            />
          );
        })
      ) : !fullData ? (
        <Loader />
      ) : (
        <TableNumbers
          tableName="Мой номер"
          tableItem={fullData.fullUserInfo.account.number}
          pricePlan={data.me.account.number.pricePlan}
        />
      )}
    </div>
  );
};

export default NumbersPage;
