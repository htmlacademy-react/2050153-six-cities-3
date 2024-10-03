export type OfferProps = {
  id?: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
     };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description?: string[];
  bedrooms: number;
  goods?: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images?: string[];
  maxAdults: number;
};

export const offer: OfferProps = {
  id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
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
  goods: [
    'Heating',
    'Wi-Fi',
    'Washing machine',
    'Towels',
    'Coffee machine',
    'Baby seat',
    'Kitchen',
    'Dishwasher',
    'Cabel TV',
    'Fridge'
  ],
  host: {
    name: 'Angelina Conner',
    avatarUrl: 'img/avatar-angelina.jpg"',
    isPro: true
  },
  images: [
    'img/room.jpg',
    'img/apartment-01.jpg',
    'img/apartment-02.jpg',
    'img/apartment-03.jpg',
    'img/studio-01.jpg'
  ],
  maxAdults: 4
};
