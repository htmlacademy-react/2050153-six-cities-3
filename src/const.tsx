export const Cities: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const SortOptions: string[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

export const Setting = {
  OffersCount: 5
};

export const PageType = {
  Main: 'cities',
  Favorites: 'favorites',
  Offer: 'near-places'
};

// eslint-disable-next-line react-refresh/only-export-components
export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

// eslint-disable-next-line react-refresh/only-export-components
export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
