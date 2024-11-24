// this function combine reminders (MB with MB, minutes with minutes) to leaму only 3 fields
import { IRemainsFullItem } from "../../types/new-current-data-types";

export interface IResidueCombainer {
  measure: "MB" | "MINUTES" | "SMS";
  size: number;
  balance: number;
  isUnlimited: boolean;
}

const residueCombainer = (uncombinedObject: IRemainsFullItem[]): IResidueCombainer[] => {
  const combinedObject: IResidueCombainer[] = [
    {
      measure: "MB",
      size: 0,
      balance: 0,
      isUnlimited: false,
    },
    {
      measure: "MINUTES",
      size: 0,
      balance: 0,
      isUnlimited: false,
    },
    {
      measure: "SMS",
      size: 0,
      balance: 0,
      isUnlimited: false,
    },
  ];

  uncombinedObject.forEach((item) => {
    if (item.measure === "MB") {
      if (item.isUnlimited) {
        combinedObject[0].isUnlimited = true;
        return;
      }
      combinedObject[0].balance += item.balance;
      combinedObject[0].size += item.size;
    } else if (item.measure === "MINUTES") {
      if (item.isUnlimited) {
        combinedObject[1].isUnlimited = true;
        return;
      }
      combinedObject[1].balance += item.balance;
      combinedObject[1].size += item.size;
    } else if (item.measure === "SMS") {
      if (item.isUnlimited) {
        combinedObject[2].isUnlimited = true;
        return;
      }
      combinedObject[2].balance += item.balance;
      combinedObject[2].size += item.size;
    }
  });

  return combinedObject;
};

export default residueCombainer;
