// Получение целого положительного числа из диапазона
export const getRandomInteger = (a : number, b : number) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

// Функция для удаления дубликатов из массива со строками
export const removeDups = (arr: string[]): string[] => arr.filter((item,
  index) => arr.indexOf(item) === index);
