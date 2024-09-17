import { FC } from 'react';

import TableNumbers from '../../ui/tables/table-numbers';
import config from '../../../../../auxuliary.json';

const NumbersPage: FC = () => {
  return (
    <div className="h-full w-full pl-[45px] pt-[40px]">
      <div className="numbers-title text-[22px] font-semibold">
        Дочерние номера
      </div>

      <TableNumbers tableName="Группа 1" tableItem={config.tableInfo1} />
      <TableNumbers tableName="Группа 2" tableItem={config.tableInfo2} />
    </div>
  );
};

export default NumbersPage;
