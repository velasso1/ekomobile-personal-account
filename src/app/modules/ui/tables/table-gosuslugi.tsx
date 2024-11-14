import { FC } from "react";

import beautifyNumber from "../../../utils/helpers/beautifyNumber";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { defaultStyles } from "../../../utils/default-styles";

import Loader from "../loader/loader";
import { IGroupNumber, IGUHints, TGUConfimationStatusId } from "../../../types/gosuslugi-types";
import { ITableGosuslugiProps } from "../../../types/table-types";
import useGetGosuslugiData from "../../../hooks/useGetGosuslugiData";

const getStatusBageClass = (status: TGUConfimationStatusId) => {
  const bageBase = "badge badge-outline badge-";
  switch (status) {
    case "NOT_REQUIRED":
      return bageBase + "success";
    case "REQUIRED":
      return bageBase + "danger";
    case "REQUESTED":
      return bageBase + "primary";
  }
};

const getGUHintText = (status: TGUConfimationStatusId, hints: IGUHints) => {
  switch (status) {
    case "NOT_REQUIRED":
      return hints.confirmationNotNeeded;
    case "REQUIRED":
      return hints.confirmationNeeded;
    case "REQUESTED":
      return hints.confirmationRequested;
  }
};

const getStatus = (items: IGroupNumber[]) => {
  const status = items[0].guConfirmationInfo.status.id;
  items.forEach((item) => {
    if (item.guConfirmationInfo.status.id !== status) {
      try {
        throw new Error(`
          table contains different statuses. 
          expected: ${status} 
          got: ${item.guConfirmationInfo.status.id}
          `);
      } catch (error) {
        console.error(error.message);
      }
    }
  });

  return status;
};

const TableGosuslugi: FC<ITableGosuslugiProps> = ({ tableName, tableItem }) => {
  if (!tableName || tableItem.length === 0) {
    return null;
  }

  const { data, loading, hints } = useGetGosuslugiData();

  if (loading || !data) {
    return <Loader />;
  }

  return (
    <div className="card mt-[30px] xs:w-[283px] xs:overflow-scroll md:w-auto lg:overflow-auto">
      <div className="card-header flex justify-start">
        <h3 className="card-title">{tableName}</h3>

        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => (
            <Tooltip id="hint-tooltip" {...props} className="max-w-[300px] py-[10px]">
              {getGUHintText(getStatus(tableItem), hints)}
            </Tooltip>
          )}
        >
          <span className="align-items-center ml-2 flex cursor-pointer justify-center border-0 bg-transparent">
            <i className={`ki-outline ki-question-2 fs-3 ${defaultStyles.textColor.lightGrey}`}></i>
          </span>
        </OverlayTrigger>
      </div>
      <div className="card-table">
        <table className="table flex align-middle font-medium text-gray-700 sm:text-[10px] md:text-sm">
          <thead></thead>
          <tbody>
            {tableItem.map((item) => {
              return (
                <tr key={item.msisdn}>
                  <td className="w-[50%]">
                    {beautifyNumber(item.msisdn)}
                    <span
                      className={`ml-2 text-[12px] ${defaultStyles.textColor.lightGrey}`}
                    >{`(${item.mark.name})`}</span>
                  </td>
                  <td className="w-[50%]">
                    <span className={getStatusBageClass(item.guConfirmationInfo.status.id)}>
                      {item.guConfirmationInfo.status.name}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableGosuslugi;
