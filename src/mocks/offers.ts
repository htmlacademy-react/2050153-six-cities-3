import { OffersProps } from '../types/offer';
import { Cities, Goods, OfferTypes, Urls, OfferDescription } from '../const';
import { getRandomArrayElement, getArrayFromRandomElements, getRandomInteger } from '../utils/utils';
import { users } from './users';

export const createOffer = (index: number): OffersProps => ({
  id: String(index),
  title: 'Beautiful & luxurious with a great location',
  type: getRandomArrayElement(OfferTypes),
  price: getRandomInteger(100, 1000),
  city: {
    name: getRandomArrayElement(Cities),
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
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
