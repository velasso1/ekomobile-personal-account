import { FC, useState, useEffect } from "react";

import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_SERVICES } from "../../../api/apollo/queries/get-services";
import { GET_AVAILABLE_SERVICES } from "../../../api/apollo/queries/get-services";

import { IServicesPageResponse } from "../../../types/servicespage-response-types";
import { IAvailableServicesResponse } from "../../../types/servicespage-response-types";

import { IReturningItem } from "../../../utils/helpers/services-converter";

import Accordion from "../../ui/accordion/accordion";
import { PageTitle } from "../../ui/page-title";

import Loader from "../../ui/loader/loader";
import { WarningBadge } from "../../ui";

import { servicesConverter } from "../../../utils/helpers/services-converter";

const ServicesPage: FC = () => {
  const { data: enabledServices, loading, error } = useQuery<IServicesPageResponse>(GET_SERVICES);
  const [getAvailableServices, { data: availableServices, loading: avaiLoading, error: avaiError }] =
    useLazyQuery<IAvailableServicesResponse>(GET_AVAILABLE_SERVICES);

  const [selectValue, setSelectValue] = useState<string>("1");
  const [activeTab, setActiveTab] = useState<boolean>(true);
  const [enabledServicesData, setEnabledServicesData] = useState<IReturningItem>({});
  const [availableServicesState, setAvalableServicesState] = useState<IReturningItem>({});

  useEffect(() => {
    if (enabledServices && enabledServices.me) {
      setEnabledServicesData(servicesConverter(enabledServices));
    }
  }, [enabledServices]);

  useEffect(() => {
    if (availableServices && availableServices.me) {
      setAvalableServicesState(servicesConverter(availableServices));
    }
  }, [availableServices]);

  if (loading || avaiLoading) {
    return <Loader />;
  }

  if (error || avaiError) {
    return <WarningBadge isError={true} />;
  }

  return (
    <div className="mb-[40px] pl-[45px] pt-[40px]">
      <PageTitle title="Услуги" />

      <select
        className="select mt-[15px] w-[200px]"
        name="select"
        onChange={(e) => {
          setSelectValue(e.target.value);
          getAvailableServices();
        }}
      >
        <option value="1">Подключенные</option>
        <option value="2">Не подключенные</option>
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
            {selectValue === "1" ? (
              <>
                {Object.entries(enabledServicesData).map((serviceItem) => {
                  if (serviceItem[1].length === 0) {
                    return;
                  }
                  return (
                    <Accordion
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
                      accordionNumber={2}
                      accordionTitle={`${serviceItem[0]}`}
                      accrodionItems={serviceItem[1]}
                      servicesQuantity={serviceItem[1].length}
                      connect={true}
                    />
                  );
                })}
              </>
              // <span>s</span>
              // <Accordion accordionNumber={90} accordionTitle="Зарубежные тарифы" connect={true} />
            )}
          </div>
        ) : (
          <div className="" id="tab_1_2">
            Пока что таких тарифов нет
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
