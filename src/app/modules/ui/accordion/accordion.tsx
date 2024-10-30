import { FC, useState } from "react";

import ModalServices from "../modals/modal-services";

import { defaultStyles } from "../../../utils/default-styles";

import { IServicesItem } from "../../../types/servicespage-response-types";
import { IAvailableServiceItem } from "../../../types/servicespage-response-types";

import { PriceTypes } from "../../../utils/auxuliary-data/services-categories";
import { dateFormatter } from "../../../utils/helpers/date-formatter";
import { moneyFormatter } from "../../../utils/helpers/money-formatter";

interface IAccordionProps {
  accordionNumber: number;
  accordionTitle: string;
  accrodionItems: IServicesItem[] | IAvailableServiceItem[];
  servicesQuantity: number;
  connect?: boolean;
}

const Accordion: FC<IAccordionProps> = ({
  accordionNumber,
  accordionTitle,
  accrodionItems,
  servicesQuantity,
  connect,
}) => {
  const [accordionOpen, setAccOpen] = useState<boolean>(false);
  const { bgColor, textSize, textColor } = defaultStyles;

  return (
    <>
      <div className="my-[20px] flex flex-col gap-5 pr-[45px] xs:w-[283px] md:w-auto" data-accordion="true">
        <div
          className={`accordion-item rounded-xl border ${bgColor.white}`}
          data-accordion-item="true"
          id={`accordion_4_item_${accordionNumber}`}
        >
          <button
            className="accordion-toggle p-4"
            data-accordion-toggle={`#accordion_4_content_${accordionNumber}`}
            onClick={(e) => {
              e.preventDefault();
              setAccOpen((prev) => !prev);
            }}
          >
            <p className={`text-base font-semibold sm:${textSize.default} md:text-[16px]`}>
              {accordionTitle}
              <span className={`ml-[5px] font-semibold ${textColor.grey}`}>{servicesQuantity}</span>
            </p>
            <i className="ki-outline ki-plus block text-2sm text-gray-600 accordion-active:hidden"></i>
            <i className="ki-outline ki-minus hidden text-2sm text-gray-600 accordion-active:block"></i>
          </button>
          <div
            className={`accordion-content ${accordionOpen ? "active" : "hidden"} border-t xs:overflow-scroll lg:overflow-auto`}
            id={`accordion_4_content_${accordionNumber}`}
          >
            <div className="p-4 text-md text-gray-700">
              <div className="card-table pb-[20px]">
                <table className="table flex align-middle text-sm font-medium text-gray-700">
                  <thead>
                    <tr className="">
                      <th className="">Название</th>
                      <th className="">Описание услуги</th>
                      <th className="">Дата подключения</th>
                      <th className="">Стоимость</th>
                      <th className="">Тип стоимости</th>
                      <th className="">Описание</th>
                      <th className="">Действия</th>
                    </tr>
                  </thead>
                  <tbody className={`${textColor.grey}`}>
                    {accrodionItems.map((item) => {                      
                      return (
                        <tr key={crypto.randomUUID()}>
                          <td className={`text-[14px] font-semibold ${textColor.darkBlue}`}>{item.name}</td>
                          <td>{item.description ? item.description : "Отсутствует"}</td>
                          <td> {item.enabledAt ? dateFormatter(item.enabledAt).date : "Не подключено"}</td>

                          <td>{moneyFormatter(item.fee.amount)} ₽</td>
                          <td>{PriceTypes[item.fee.type]}</td>
                          <td>
                            <i className="ki-outline ki-information-2 cursor-pointer" data-modal-toggle="#modal_1"></i>
                            {/* <i className="ki-outline ki-notepad-edit text-[16px] text-[#1B84FF]"></i> */}
                          </td>
                          <td>
                            {item.isReadonly ? (
                              <span className="">Для уточнения обратитесь в поддержку</span>
                            ) : !connect ? (
                              <span className="badge badge-danger hover:cursor-pointer">Отключить</span>
                            ) : (
                              <span className="badge badge-primary">Подключить</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="border-b border-b-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalServices />
    </>
  );
};

export default Accordion;
