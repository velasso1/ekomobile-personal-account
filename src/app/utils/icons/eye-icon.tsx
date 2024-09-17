import { FC } from 'react';

interface IEyeIconProps {
  onClickCb: () => void;
}

const EyeIcon: FC<IEyeIconProps> = ({ onClickCb }) => {
  return (
    <i
      className="ki-outline ki-eye hover:cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        onClickCb();
      }}
    />
  );
};

export default EyeIcon;
