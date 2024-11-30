export interface IReturnFormatDate {
  date: string;
  fullHours: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
}

export const dateFormatter = (date: Date | string): IReturnFormatDate => {
  const fullDate = new Date(date).toLocaleDateString();

  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const seconds = new Date(date).getSeconds();
  const fullHours = `${hours}:${minutes > 9 ? minutes : "0" + minutes}`;

  return {
    date: fullDate,
    fullHours: fullHours,
    hours: hours.toString(),
    minutes: minutes.toString(),
    seconds: seconds.toString(),
  };
};
