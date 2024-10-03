import { FC } from "react";

interface IPageTitleProps {
  title: string;
}

const PageTitle: FC<IPageTitleProps> = ({ title }) => {
  return <div className="numbers-title pb-[30px] text-[22px] font-semibold">{title}</div>;
};

export default PageTitle;
