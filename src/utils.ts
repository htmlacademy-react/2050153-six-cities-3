// Приобразование формата отображения текста с первой заглавной буквой.
// Пример: "Название Города"
export const CapitalizeWords = (str) => str.replace(/\b\w/g, (c) => (c).toUpperCase());
