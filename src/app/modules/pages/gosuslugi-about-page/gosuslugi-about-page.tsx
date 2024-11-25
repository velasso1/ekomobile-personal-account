import { FC, useState } from "react";

import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";
import ReactMarkdown from "react-markdown";
import PrevNextButtons from "../../ui/prev-next-buttons/prev-next-buttons";
import { mainRoutes } from "../../../utils/routes-name/main-routes";

import Loader from "../../ui/loader/loader";
import useGetGosuslugiData from "../../../hooks/useGetGosuslugiData";
import CheckboxInput from "../../ui/checkbox-input/checkbox-input";

const staticTexts = {
  title: "Подтверждение номера на Госуслугах",
};

const GosuslugiAboutPage: FC = () => {
  const { data, loading, aboutContent } = useGetGosuslugiData();
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
          <div className="mt-7">
            <CheckboxInput
              id="pdAgreement"
              isChecked={isAgree}
              label={aboutContent.pdAgreement}
              onChange={() => setIsAgree(!isAgree)}
              markDownClassname={"markdown-gosuslugi-about"}
              isMakdownText
            />
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
