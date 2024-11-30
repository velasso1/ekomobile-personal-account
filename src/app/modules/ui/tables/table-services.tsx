import { FC } from "react";

import { IServiceTableProps } from "../../../types/table-types";

const TableServices: FC<IServiceTableProps> = ({ tableName = "unknown", tableItem }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{tableName}</h3>
      </div>
    </div>
  );
};

export default TableServices;
