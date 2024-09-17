import { FC } from 'react';
import config from '../../../../../auxuliary.json';

import ModalServices from '../modals/modal-services';

interface IAccordionProps {
  accordionNumber: number;
  accordionTitle: string;
  connect?: boolean;
}

const Accordion: FC<IAccordionProps> = ({
  accordionNumber,
  accordionTitle,
  connect,
}) => {
  return (
    <>
      <div
        className="my-[20px] flex flex-col gap-5 pr-[45px]"
        data-accordion="true"
      >
        <div
          className="accordion-item rounded-xl border bg-[#fff]"
          data-accordion-item="true"
          id={`accordion_4_item_${accordionNumber}`}
        >
          <button
            className="accordion-toggle p-4"
            data-accordion-toggle={`#accordion_4_content_${accordionNumber}`}
          >
            <span className="text-[16px] text-base font-semibold">
              {accordionTitle}{' '}
              <span className="font-semibold text-[#78829D]">4</span>
            </span>
            <i className="ki-outline ki-plus block text-2sm text-gray-600 accordion-active:hidden"></i>
            <i className="ki-outline ki-minus hidden text-2sm text-gray-600 accordion-active:block"></i>
          </button>
          <div
            className="accordion-content hidden border-t"
            id={`accordion_4_content_${accordionNumber}`}
          >
            <div className="p-4 text-md text-gray-700">
              {/* <TableServices tableItem={config.servTableInfo} /> */}
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
                  <tbody className="text-[#78829D]">
                    {config.servTableInfo.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-[14px] font-semibold text-[#071437]">
                            {item.name}
                          </td>
                          <td>{item.description}</td>
                          <td>{item.date} ₽</td>

                          <td>{item.price}</td>
                          <td>
                            {item.typePrice}{' '}
                            <i
                              className="ki-outline ki-information-2 cursor-pointer"
                              data-modal-toggle="#modal_1"
                            ></i>
                          </td>
                          <td>
                            <i className="ki-outline ki-notepad-edit text-[16px] text-[#1B84FF]"></i>
                          </td>
                          <td>
                            {item.actions ? (
                              <span className="">
                                Для уточнения обратитесь в поддержку
                              </span>
                            ) : !connect ? (
                              <span className="badge badge-danger">
                                Отключить
                              </span>
                            ) : (
                              <span className="badge badge-primary">
                                Подключить
                              </span>
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
