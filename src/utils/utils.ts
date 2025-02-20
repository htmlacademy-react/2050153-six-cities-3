import { ReviewsProps } from '../types/review';

// Получение целого положительного числа из диапазона
export const getRandomInteger = (a : number, b : number) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

// Функция для удаления дубликатов из массива со строками
export const removeDups = (arr: string[]): string[] => arr.filter((item,
  index) => arr.indexOf(item) === index);

// Получение случайного значения из массива данных
const getRandomArrayElement = (elements: ReviewsProps[]):ReviewsProps => elements[getRandomInteger(0, elements.length - 1)];

// Получение массива случайной длины из значений
export const getArrayWithSpecificLengthFromRandomElements = (arr: ReviewsProps[], maxLength: number): ReviewsProps[] => Array.from(
  { length: maxLength },
  () => getRandomArrayElement(arr),
);
