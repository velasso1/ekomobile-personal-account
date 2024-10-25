import { FC } from "react";

import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_GU_DATA } from "../../../api/apollo/queries/get-gu_data";
import Loader from "../../ui/loader/loader";
import { IGroup } from "../../../types/gu-types";

const staticTexts = {
  title: "Подтверждение номера на Госуслугах",
};

const GosuslugiConfirmationPage: FC = () => {
  const { data, loading, error } = useQuery(GET_GU_DATA);
  const navigate = useNavigate();

  const groups: IGroup[] = data?.me?.account?.number?.groups;

  if (loading || !data) {
    return <Loader />;
  }
  return (
    <div className="mb-[40px] h-full w-full px-[40px] pt-[40px]">
      <PageTitle title={staticTexts.title} />
      {1 > 0 && (
        <Card>
          <div
          // className="px-[10px] py-[20px]"
          ></div>
        </Card>
      )}
    </div>
  );
};

export default GosuslugiConfirmationPage;
