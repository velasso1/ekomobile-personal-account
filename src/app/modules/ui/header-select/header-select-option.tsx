import { FC } from "react";

import { formatPhoneNumber } from "../../../utils/helpers/phone-formatter";
import { IGroupItem } from "../../../types/numbers-response-types";

interface IHeaderSelectProps {
  item: IGroupItem;
}

const HeaderSelectOption: FC<IHeaderSelectProps> = ({ item }) => {
  return (
    <>
      {item.numbers.map((item) => {
        const newFormattedPhone = formatPhoneNumber(item.msisdn);
        return (
          <option key={item.msisdn} value={item.msisdn}>
            {newFormattedPhone}
          </option>
        );
      })}
    </>
  );
};

export default HeaderSelectOption;
