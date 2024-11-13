// import dayjs from 'dayjs';

// export const DateFormat = {
//   MONTH_DAY: 'MMM DD',
//   DATE: 'YYYY-MM-DD',
// };

// Функции нужные для рендомной генерации данных
// Получение целого положительного числа из диапазона
export const getRandomInteger = (a : number, b : number) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

// Получение случайного значения из массива данных
export const getRandomArrayElement = (elements: string[]) : string => elements[getRandomInteger(0, elements.length - 1)];

export const getRandomArrayBooleanElement = (elements: boolean[]) : boolean => elements[getRandomInteger(0, elements.length - 1)];

// получение массива случайной длины из значений
export const getArrayFromRandomElements = (elements: string[]) : string[] =>
  Array.from(
    { length: getRandomInteger(0, elements.length - 1) },
    () => getRandomArrayElement(elements),
  );

// // Приобразование данных по дате в нужный формат
// export const humanizeDate = (pointDate: Date, format: string): string => dayjs(pointDate).format(format);
