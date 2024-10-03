import { FC } from "react";

import TableNumbers from "../../ui/tables/table-numbers";
import { PageTitle } from "../../ui/page-title";

import config from "../../../../../auxuliary.json";

const NumbersPage: FC = () => {
  return (
    <div className="mb-[40px] h-full w-full pl-[45px] pt-[40px]">
      <PageTitle title="Дочерние номера" />

      <TableNumbers tableName="Группа 1" tableItem={config.tableInfo1} />
      <TableNumbers tableName="Группа 2" tableItem={config.tableInfo2} />
    </div>
  );
};

export default NumbersPage;
