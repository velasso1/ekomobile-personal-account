// This function transforms data for better display in the interface

import { IAvailableServiceItem, IServicesPageResponse } from "../../types/servicespage-response-types";
import { IAvailableServicesResponse } from "../../types/servicespage-response-types";
import { ServicesWithId } from "../auxuliary-data/services-categories";
import { IServicesItem } from "../../types/servicespage-response-types";

export interface IReturningItem {
  [key: string]: IServicesItem[] | IAvailableServiceItem[];
}

export const servicesConverter = (
  converterItem: IServicesPageResponse | IAvailableServicesResponse
): IReturningItem => {
  const serviceData: { [key: string]: IServicesItem[] | IAvailableServiceItem[] } = {};

  // create an object with properties like a category names
  for (const serviceName of Object.keys(ServicesWithId)) {
    if (isNaN(Number(serviceName))) {
      serviceData[serviceName] = [];
    }
  }

  // get data from converterItem and push item to according to its category
  for (let i = 0; i <= converterItem.me.account.number.services.length; i++) {
    if (
      converterItem.me.account.number.services[i] &&
      converterItem.me.account.number.services[i].category !== undefined
    ) {
      serviceData[`${ServicesWithId[converterItem.me.account.number.services[i].category.id]}`].push(
        converterItem.me.account.number.services[i]
      );
    }
  }

  return serviceData;
};

export const filterFreeItems = (
  filterItem: IServicesPageResponse | IAvailableServicesResponse,
  free: boolean
): IServicesPageResponse | IAvailableServicesResponse => {
  const newFilteredItems: IServicesPageResponse | IAvailableServicesResponse = {
    me: {
      account: {
        number: {
          services: filterItem.me.account.number.services.filter((item) => {
            if (item.fee) {
              return free ? item.fee.amount === 0 : item.fee.amount > 0;
            }
          }),
        },
      },
    },
  };

  return newFilteredItems;
};
