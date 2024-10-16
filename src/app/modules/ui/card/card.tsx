import { FC } from "react";

interface ICardProps {
  children: React.ReactNode;
  cardTitle?: string;
  style?: string;
}

const Card: FC<ICardProps> = ({ children, cardTitle, style }) => {
  return (
    <div className={`card mb-[40px] ${style}`}>
      {cardTitle ? <div className="card-title w-full border-b-2 px-[25px] py-[15px]">{cardTitle}</div> : null}

      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
