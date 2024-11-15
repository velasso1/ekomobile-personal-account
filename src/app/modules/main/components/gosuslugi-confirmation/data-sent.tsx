import ReactMarkdown from "react-markdown";
import useGetGosuslugiData from "../../../../hooks/useGetGosuslugiData";
import { Button } from "../../../ui/button";
import { useNavigate } from "react-router-dom";
import { mainRoutes } from "../../../../utils/routes-name/main-routes";

const staticTexts = {
  buttonOk: "ОК",
};

const DataSent = () => {
  const { data, loading, aboutContent } = useGetGosuslugiData();
  const navigate = useNavigate();

  return (
    <div className="pt-[10px]">
      <div className="w-[650px] text-[14px]">
        <ReactMarkdown children={aboutContent.requestSent} className={"markdown-data-sent"} />
      </div>

      <div className="flex pt-7">
        <span>
          <Button
            buttonType="default"
            title={staticTexts.buttonOk}
            onClickCb={() => {
              navigate(mainRoutes.gosuslugiNumbers);
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default DataSent;
