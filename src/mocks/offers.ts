import { OffersProps } from '../types/offer';
import { Goods, OfferTypes, Urls, OfferDescription, Coordinates} from '../const';
import { getRandomArrayElement, getArrayFromRandomElements, getRandomInteger } from '../utils/utils';
import { users } from './users';
import { getCityLocation, getOfferLocation } from './city-locations';

export const createOffer = (index: number): OffersProps => ({
  id: String(index),
  title: 'Beautiful & luxurious with a great location',
  type: getRandomArrayElement(OfferTypes),
  price: getRandomInteger(100, 1000),
  city: getCityLocation(Coordinates),
  location: getOfferLocation(Coordinates),
  isFavorite: false,
  isPremium: true,
  rating: getRandomInteger(4, 5),
  description: getArrayFromRandomElements(OfferDescription),
  bedrooms: getRandomInteger(1, 5),
  goods: getArrayFromRandomElements(Goods),
  host: users[getRandomInteger(0, users.length - 1)],
  images: getArrayFromRandomElements(Urls),
  previewImage: getRandomArrayElement(Urls),
  maxAdults: getRandomInteger(1, 10)
});

export const generateOffers = (offersCount: number): OffersProps[] => (
  Array.from(new Array(offersCount), (_, index): OffersProps => createOffer(index)));
