import { FC, useState, useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { GET_AVAILABLE_SERVICES, GET_SERVICES } from "../../../api/apollo/queries/get-services";
import { IServicesPageResponse } from "../../../types/servicespage-response-types";

import { IAvailableServicesResponse } from "../../../types/servicespage-response-types";

import { IReturningItem } from "../../../utils/helpers/services-converter";

import Accordion from "../../ui/accordion/accordion";
import { PageTitle } from "../../ui/page-title";

import Loader from "../../ui/loader/loader";
import { WarningBadge } from "../../ui";

import { servicesConverter } from "../../../utils/helpers/services-converter";
import { filterFreeItems } from "../../../utils/helpers/services-converter";
import { useAppDispatch, useAppSelector } from "../../../store";
import { changeSelectOption } from "../../../store/slices/user-slice";

const ServicesPage: FC = () => {
  const dispatch = useAppDispatch();

  // queries
  const [getEnabledServices, { data: enabledServices, loading, error }] =
    useLazyQuery<IServicesPageResponse>(GET_SERVICES);
  const [getAvailableServices, { data: availableServices, loading: avaiLoading, error: avaiError }] =
    useLazyQuery<IAvailableServicesResponse>(GET_AVAILABLE_SERVICES);

  // component state
  const [activeTab, setActiveTab] = useState<boolean>(true);
  // list of enabled services
  const [enabledServicesData, setEnabledServicesData] = useState<IReturningItem>({});
  // list of available services for connection
  const [availableServicesState, setAvalableServicesState] = useState<IReturningItem>({});
  // list of free services of enabled and availables lists
  const [freeServices, setFreeServices] = useState<IReturningItem>({});

  // react-redux
  const { servicesChecked, newCurrentData } = useAppSelector((state) => state.userSlice);

  // effects
  useEffect(() => {
    if (newCurrentData) {
      setEnabledServicesData(servicesConverter(filterFreeItems(newCurrentData, false)));
      setFreeServices(servicesConverter(filterFreeItems(newCurrentData, true)));
      dispatch(changeSelectOption("ENABLED"));
    }
  }, [newCurrentData, enabledServices]);

  useEffect(() => {
    if (availableServices && availableServices.me) {
      setAvalableServicesState(servicesConverter(filterFreeItems(availableServices, false)));
      setFreeServices(servicesConverter(filterFreeItems(availableServices, true)));
    }
  }, [availableServices]);

  if (!newCurrentData || avaiLoading || loading) {
    return <Loader />;
  }

  if (avaiError) {
    return <WarningBadge isError={true} />;
  }

  return (
    <div className="mb-[40px] pl-[45px] pt-[40px]">
      <PageTitle title="Услуги" />

      <select
        className="select mt-[15px] w-[200px]"
        name="select"
        value={servicesChecked}
        onChange={(e) => {
          if (e.target.value === "ENABLED" || e.target.value === "DISABLED") {
            dispatch(changeSelectOption(e.target.value));
          }

          if (e.target.value === "ENABLED") {
            getEnabledServices({ fetchPolicy: "no-cache" });
            return;
          }

          getAvailableServices({ fetchPolicy: "no-cache" });
        }}
      >
        <option value="ENABLED">Подключенные</option>
        <option value="DISABLED">Не подключенные</option>
      </select>

      <div className="mt-[40px]">
        <div className="tabs mb-5" data-tabs="true">
          <button
            className={`${activeTab ? "active" : ""} tab`}
            data-tab-toggle="#tab_1_1"
            onClick={() => setActiveTab(true)}
          >
            Платные
          </button>
          <button
            className={`${!activeTab ? "active" : ""} tab`}
            data-tab-toggle="#tab_1_2"
            onClick={() => setActiveTab(false)}
          >
            Бесплатные
          </button>
        </div>
        {activeTab ? (
          <div className="" id="tab_1_1">
            {servicesChecked === "ENABLED" ? (
              <>
                {Object.entries(enabledServicesData).map((serviceItem) => {
                  if (serviceItem[1].length === 0) {
                    return;
                  }

                  return (
                    <Accordion
                      key={crypto.randomUUID()}
                      accordionNumber={2}
                      accordionTitle={`${serviceItem[0]}`}
                      accrodionItems={serviceItem[1]}
                      servicesQuantity={serviceItem[1].length}
                      connect={true}
                    />
                  );
                })}
              </>
            ) : (
              <>
                {Object.entries(availableServicesState).map((serviceItem) => {
                  if (serviceItem[1].length === 0) {
                    return;
                  }

                  return (
                    <Accordion
                      key={crypto.randomUUID()}
                      accordionNumber={2}
                      accordionTitle={`${serviceItem[0]}`}
                      accrodionItems={serviceItem[1]}
                      servicesQuantity={serviceItem[1].length}
                      connect={true}
                    />
                  );
                })}
              </>
            )}
          </div>
        ) : (
          <div className="visible" id="tab_1_2">
            {Object.entries(freeServices).map((serviceItem) => {
              if (serviceItem[1].length === 0) {
                return;
              }

              return (
                <Accordion
                  key={crypto.randomUUID()}
                  accordionNumber={2}
                  accordionTitle={`${serviceItem[0]}`}
                  accrodionItems={serviceItem[1]}
                  servicesQuantity={serviceItem[1].length}
                  connect={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
