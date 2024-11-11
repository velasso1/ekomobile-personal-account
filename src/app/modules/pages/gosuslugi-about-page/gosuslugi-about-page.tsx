import { FC, useState } from "react";

import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";
import ReactMarkdown from "react-markdown";
import PrevNextButtons from "../../ui/prev-next-buttons/prev-next-buttons";
import { mainRoutes } from "../../../utils/routes-name/main-routes";
import { useQuery } from "@apollo/client";

import Loader from "../../ui/loader/loader";
import { IGUConfrirmation } from "../../../types/gosuslugi-types";
import { GET_GOSUSLUGI_DATA } from "../../../api/apollo/queries/get-gosuslugi-data";

const staticTexts = {
  title: "Подтверждение номера на Госуслугах",
};

const GosuslugiAboutPage: FC = () => {
  const { data, loading, error } = useQuery(GET_GOSUSLUGI_DATA);
  const aboutContent: IGUConfrirmation = data.info.guConfirmation;
  const [isAgree, setIsAgree] = useState(false);

  if (loading || !data) {
    return <Loader />;
  }

  return (
    <div className="mb-[40px] h-full w-full px-[40px] pt-[40px]">
      <PageTitle title={staticTexts.title} />

      <Card>
        <div className="pt-[10px]">
          <div className="w-[650px] text-[14px]">
            <ReactMarkdown children={aboutContent.aboutConfirmation} className={"markdown-gosuslugi-about"} />
          </div>
          <div>
            <div className="form-check-lg form-check-solid mt-7 flex">
              <input
                className="form-check-input mr-1"
                type="checkbox"
                checked={isAgree}
                onChange={() => setIsAgree(!isAgree)}
                id="pdAgreement"
              />
              <label className="form-check-label">
                <ReactMarkdown children={aboutContent.pdAgreement} className={"markdown-gosuslugi-about"} />
              </label>
            </div>
          </div>
          <div className="pt-8">
            <PrevNextButtons nextRoute={mainRoutes.gosuslugiConfirmation} nextDisabled={!isAgree} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GosuslugiAboutPage;
