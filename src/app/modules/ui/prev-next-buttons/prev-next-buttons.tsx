import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { IMainRoutes } from "../../../types/routes-types";

interface IProps {
  nextRoute: IMainRoutes[keyof IMainRoutes];
}

const staticTexts = {
  buttonTitles: {
    previous: "Назад",
    next: "Далее",
  },
};

const PrevNextButtons = ({ nextRoute }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="mr-5">
        <Button
          buttonType="grayBackgroundBlackText"
          title={staticTexts.buttonTitles.previous}
          onClickCb={() => navigate(-1)}
        />
      </div>

      <div>
        <Button buttonType="default" title={staticTexts.buttonTitles.next} onClickCb={() => navigate(nextRoute)} />
      </div>
    </div>
  );
};

export default PrevNextButtons;
