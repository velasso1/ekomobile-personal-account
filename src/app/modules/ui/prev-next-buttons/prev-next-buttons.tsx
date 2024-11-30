import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { IMainRoutes } from "../../../types/routes-types";

interface IProps {
  nextClick?: () => void;
  prevClick?: () => void;
  nextRoute?: IMainRoutes[keyof IMainRoutes];
  nextDisabled?: boolean;
  prevDisabled?: boolean;
}

const staticTexts = {
  buttonTitles: {
    previous: "Назад",
    next: "Далее",
  },
};

const PrevNextButtons = ({ nextRoute, nextDisabled, prevDisabled, nextClick, prevClick }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="mr-5">
        <Button
          buttonType="grayBackgroundBlackText"
          title={staticTexts.buttonTitles.previous}
          onClickCb={() => {
            if (prevClick) {
              prevClick();
            } else {
              navigate(-1);
            }
          }}
          disabled={prevDisabled}
        />
      </div>

      <div>
        <Button
          buttonType="default"
          title={staticTexts.buttonTitles.next}
          onClickCb={() => {
            if (nextClick) {
              nextClick();
            } else if (nextRoute) {
              navigate(nextRoute);
            }
          }}
          disabled={nextDisabled}
        />
      </div>
    </div>
  );
};

export default PrevNextButtons;
