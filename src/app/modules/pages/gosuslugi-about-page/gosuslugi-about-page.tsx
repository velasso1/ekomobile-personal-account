import { FC } from "react";

import { PageTitle } from "../../ui/page-title";
import { Card } from "../../ui/card";
import config from "../../../../../auxuliary.json";
import ReactMarkdown from "react-markdown";

const staticTexts = {
  title: "Подтверждение номера на Госуслугах",
};

const GosuslugiAboutPage: FC = () => {
  const aboutContent = config.GUAbout.data.info.guConfirmation;

  return (
    <div className="mb-[40px] h-full w-full px-[40px] pt-[40px]">
      <PageTitle title={staticTexts.title} />

      <Card style="">
        <div className="py-[10px]">
          <div className="w-[650px] text-[14px]">
            <ReactMarkdown children={aboutContent.aboutConfirmation} className={"markdown-gosuslugi-about"} />
          </div>
          <div className="mb-10">
            <div className="form-check-lg form-check-solid mt-7 flex">
              <input className="form-check-input mr-1" type="checkbox" value="" id="pdAgreement" />
              <label className="form-check-label" for="flexCheckDefault">
                <ReactMarkdown children={aboutContent.pdAgreement} className={"markdown-gosuslugi-about"} />
              </label>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GosuslugiAboutPage;
