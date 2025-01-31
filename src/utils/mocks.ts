import { internet, datatype, address, random, image } from 'faker';
import { cities } from '../const';
import { UserData } from '../types/user';
import { OffersProps } from '../types/offer';
import { ReviewsProps } from '../types/review';

const city = random.arrayElement(cities);

export const makeFakeOffer = (): OffersProps => ({
  id: datatype.uuid(),
  title: datatype.string(),
  type: random.word(),
  price: datatype.number(1000),
  city: city,
  location: {
    latitude: Number(address.latitude(city.location.latitude)),
    longitude: Number(address.longitude(city.location.longitude)),
    zoom: 8
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number({ min: 1, max: 5, precision: 1 }),
  previewImage: random.arrayElements([image.imageUrl()], 6),
  description: datatype.string(),
  bedrooms: datatype.number({ min: 0, max: 8, precision: 1 }),
  goods: random.arrayElements([image.imageUrl()], 4),
  host: {
    name: internet.userName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean()
  },
  images: random.arrayElements([image.imageUrl()], 8),
  maxAdults: datatype.number({ min: 1, max: 8, precision: 1 }),
} as unknown as OffersProps);

export const makeFakeFavoriteOffer = (): OffersProps => ({
  id: datatype.uuid(),
  title: datatype.string(),
  type: random.word(),
  price: datatype.number(1000),
  city: city,
  location: {
    latitude: Number(address.latitude(city.location.latitude)),
    longitude: Number(address.longitude(city.location.longitude)),
    zoom: 8
  },
  isFavorite: true,
  isPremium: datatype.boolean(),
  rating: datatype.number({ min: 1, max: 5, precision: 1 }),
  previewImage: random.arrayElements([image.imageUrl()], 6),
  description: datatype.string(),
  bedrooms: datatype.number({ min: 0, max: 8, precision: 1 }),
  goods: random.arrayElements([image.imageUrl()], 4),
  host: {
    name: internet.userName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean()
  },
  images: random.arrayElements([image.imageUrl()], 8),
  maxAdults: datatype.number({ min: 1, max: 8, precision: 1 }),
} as unknown as OffersProps);

export const makeFakeUser = (): UserData => ({
  name: internet.userName(),
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean(),
  email: internet.email(),
  token: datatype.string(),
} as UserData);

export const makeFakeOfferReview = (): ReviewsProps => ({
  id: datatype.uuid(),
  date: datatype.datetime().toString(),
  user: {
    name: internet.userName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
  },
  comment: datatype.string(),
  rating: datatype.number({ min: 1, max: 5, precision: 1 }),
} as ReviewsProps);
