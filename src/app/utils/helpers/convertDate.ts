/**
 * меняет представление даты из стандартного инпута на более читаемое 1980-12-31 --> 31.12.1980
 * @param {string} dateString дата в формате ГГГГ-ММ-ДД, как в стандартном инпуте
 * @returns {string} отформатированая строка в формате ДД.ММ.ГГГГ
 */
const convertDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export default convertDate;
