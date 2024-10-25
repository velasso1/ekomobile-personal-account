import { FC, useState } from "react";

import { useQuery } from "@apollo/client";
import { GET_SERVICES } from "../../../api/apollo/queries/get-services";
import { IServicesPageResponse } from "../../../types/servicespage-response-types";

import Accordion from "../../ui/accordion/accordion";
import { PageTitle } from "../../ui/page-title";

import Loader from "../../ui/loader/loader";
import { WarningBadge } from "../../ui";

import config from "../../../../../auxuliary.json";

const ServicesPage: FC = () => {
  const { data, loading, error } = useQuery<IServicesPageResponse>(GET_SERVICES);

  const [selectValue, setSelectValue] = useState<string>("1");

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <WarningBadge isError={true} />;
  }

  return (
    <div className="mb-[40px] pl-[45px] pt-[40px]">
      <PageTitle title="Услуги" />

      <select className="select mt-[15px] w-[200px]" name="select" onChange={(e) => setSelectValue(e.target.value)}>
        <option value="1">Подключенные</option>
        <option value="2">Не подключенные</option>
      </select>

      <div className="mt-[40px]">
        <div className="tabs mb-5" data-tabs="true">
          <button className="active tab" data-tab-toggle="#tab_1_1">
            Платные
          </button>
          <button className="tab" data-tab-toggle="#tab_1_2">
            Бесплатные
          </button>
        </div>
        <div className="" id="tab_1_1">
          {selectValue === "1" ? (
            <>
              {config.accordion.map((item) => {
                return <Accordion key={item.id} accordionNumber={+item.id} accordionTitle={item.accordionTitle} />;
              })}
            </>
          ) : (
            <Accordion accordionNumber={90} accordionTitle="Зарубежные тарифы" connect={true} />
          )}
        </div>
        <div className="hidden" id="tab_1_2">
          Пока что таких тарифов нет
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
