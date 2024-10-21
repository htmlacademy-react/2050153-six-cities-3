import { OffersProps } from '../types/offers';
import { Cities, Goods, OfferTypes, Urls } from '../const';
import { getRandomArrayElement, getArrayFromRandomElements } from '../utils/utils';

export const offers: OffersProps[] = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious with a great location',
    type: getRandomArrayElement(OfferTypes),
    price: 120,
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
    rating: 4.8,
    description: [
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.'
    ],
    bedrooms: 3,
    goods: getArrayFromRandomElements(Goods),
    host: {
      name: 'Angelina Conner',
      avatarUrl: 'img/avatar-angelina.jpg"',
      isPro: true
    },
    images: getArrayFromRandomElements(Urls),
    previewImage: getRandomArrayElement(Urls),
    maxAdults: 4
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f01',
    title: 'Beautiful & luxurious with a great location',
    type: getRandomArrayElement(OfferTypes),
    price: 470,
    city: {
      name: getRandomArrayElement(Cities),
      location: {
        latitude: 52.35514938496369,
        longitude: 4.673877537499950,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496369,
      longitude: 4.673877537499950,
      zoom: 8
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.4,
    description: [
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.'
    ],
    bedrooms: 3,
    goods: getArrayFromRandomElements(Goods),
    host: {
      name: 'Angelina Conner',
      avatarUrl: 'img/avatar-angelina.jpg"',
      isPro: true
    },
    images: getArrayFromRandomElements(Urls),
    previewImage: getRandomArrayElement(Urls),
    maxAdults: 5
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f02',
    title: 'Beautiful & luxurious with a great location',
    type: getRandomArrayElement(OfferTypes),
    price: 520,
    city: {
      name: getRandomArrayElement(Cities),
      location: {
        latitude: 52.35514938496360,
        longitude: 4.673877537499920,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496360,
      longitude: 4.673877537499920,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
    description: [],
    bedrooms: 3,
    goods: getArrayFromRandomElements(Goods),
    host: {
      name: 'Angelina Conner',
      avatarUrl: 'img/avatar-angelina.jpg"',
      isPro: true
    },
    images: getArrayFromRandomElements(Urls),
    previewImage: getRandomArrayElement(Urls),
    maxAdults: 2
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f03',
    title: 'Beautiful & luxurious with a great location',
    type: getRandomArrayElement(OfferTypes),
    price: 720,
    city: {
      name: getRandomArrayElement(Cities),
      location: {
        latitude: 52.35514938496340,
        longitude: 4.673877537499940,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496340,
      longitude: 4.673877537499940,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.9,
    description: [
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.'
    ],
    bedrooms: 2,
    goods: getArrayFromRandomElements(Goods),
    host: {
      name: 'Angelina Conner',
      avatarUrl: 'img/avatar-angelina.jpg"',
      isPro: false
    },
    images: getArrayFromRandomElements(Urls),
    previewImage: getRandomArrayElement(Urls),
    maxAdults: 10
  }
];
