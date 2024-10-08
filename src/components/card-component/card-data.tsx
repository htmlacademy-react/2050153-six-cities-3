export type CardProps = {
  id?: string;
  title: string;
  type: string;
  price: number;
  city: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage?: string;
};

export const cards: CardProps[] = [
  {
    id: '6102eaea-f264-4c32-989c-61d9734748ca',
    title: 'Tile House',
    type: 'room',
    price: 149,
    city: 'Amsterdam',
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/11.jpg',
  },
  {
    id: '00362d4f-012c-4f47-a532-bbf4ed4ee717',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: 'house',
    price: 768,
    city: 'Amsterdam',
    isFavorite: true,
    isPremium: true,
    rating: 2.1,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/10.jpg',
  },
  {
    id: 'ba0142cd-685e-40d6-98cb-d987837db5fe',
    title: 'The Pondhouse - A Magical Place',
    type: 'room',
    price: 288,
    city: 'Paris',
    isFavorite: true,
    isPremium: true,
    rating: 3.1,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/12.jpg',
  },
  {
    id: '550ae365-205a-48a2-9cb0-90ad2b9fc108',
    title: 'The Pondhouse - A Magical Place',
    type: 'hotel',
    price: 225,
    city: 'Cologne',
    isFavorite: true,
    isPremium: false,
    rating: 2.9,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/13.jpg',
  },
  {
    id: '4b218a0c-8c81-442b-9012-a4c3576cd23f',
    title: 'The house among olive',
    type: 'hotel',
    price: 340,
    city: 'Cologne',
    isFavorite: false,
    isPremium: false,
    rating: 2.9,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/14.jpg',
  },
];
