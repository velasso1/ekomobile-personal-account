import { FC } from 'react';

import config from '../../../../../auxuliary.json';

interface IRemaindersItem {
  typeRemainder: string;
  fullValue: string;
  remainderValue: string;
}

const RemainderPage: FC = () => {
  const remainderItems: IRemaindersItem[] = config.remainders;
  return (
    <div className="h-full w-full p-[40px] px-[45px]">
      <div className="numbers-title pb-[30px] text-[22px] font-semibold">
        Остатки пакетов
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table align-middle text-sm font-medium text-gray-700">
            <thead>
              <tr>
                <th>Тип остатков</th>
                <th>Общее количество</th>
                <th>Сколько осталось</th>
              </tr>
            </thead>
            <tbody>
              {remainderItems.map((item, index) => {
                return (
                  <tr className="" key={index}>
                    <td className="flex items-center">
                      <div className="w-[150px]">{item.typeRemainder}</div>
                      <div className="progress bg-[#eaeaea]">
                        <div
                          className={`progress-bar rounded-[0px] ${index === 0 ? 'bg-[#005DA6]' : index === 1 ? 'bg-[#5890BC]' : 'bg-[#A8B1C3]'} px-[10px] py-[5px] text-left`}
                          style={{
                            width: `${item.fullValue === '-1' ? '100%' : (+item.remainderValue / +item.fullValue) * 100 + '%'}`,
                          }}
                        >
                          <span className="text-[10px] text-[#FFFFFF]">
                            {+item.fullValue === -1
                              ? '∞'
                              : (
                                  (+item.remainderValue / +item.fullValue) *
                                  100
                                ).toFixed() + '%'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      {+item.fullValue < 0 ? 'Безлимитно' : item.fullValue}
                    </td>
                    <td>
                      {+item.remainderValue < 0
                        ? 'Безлимитно'
                        : item.remainderValue}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RemainderPage;
