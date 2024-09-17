import { FC } from 'react';

import { ILineProgressBarProps } from '../../../types/line-progress-types';

const LineProgressBar: FC<ILineProgressBarProps> = ({ color, value, name }) => {
  return (
    <div className="information mr-[15px] flex items-center text-[12px] font-medium">
      <span
        className={`badge badge-dot mr-[5px] size-2.5 bg-[${color}]`}
      ></span>
      <span className="mr-[5px]">{name}</span>
      <span>{typeof value === 'number' ? value : value.sum} ₽</span>
    </div>
  );
};

export default LineProgressBar;
