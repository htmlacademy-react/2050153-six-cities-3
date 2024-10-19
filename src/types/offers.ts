type LocationProps = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type CityProps = {
  name: string;
  location: LocationProps;
};

type HostProps = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type CardProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityProps;
  location: LocationProps;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage?: string;
};

export type OfferProps = Omit<CardProps, 'previewImage'> & {
  description?: string[];
  bedrooms: number;
  goods?: string[];
  host: HostProps;
  images?: string[];
  maxAdults: number;
};

export type OffersProps = CardProps & OfferProps;
