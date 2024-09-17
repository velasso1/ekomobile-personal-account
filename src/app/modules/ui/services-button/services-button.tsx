import { FC } from 'react';

interface IServicesButtonProps {
  name: string;
  url?: string;
  //   action?;
}

const ServicesButton: FC<IServicesButtonProps> = ({ name }) => {
  return (
    <div className="m-[5px] my-[5px] inline-block">
      <button className="">
        <span className="badge text-[#4B5675]">{name}</span>
      </button>
    </div>
  );
};

export default ServicesButton;
