import { createAction } from '@reduxjs/toolkit';
import { CityProps, OffersProps } from '../types/offer';
import { AppRoute, AuthorizationStatus } from '../const';
// import { UserData } from '../types/user';

export const chosenCity = createAction<CityProps['name']>('offers/chosenCity');
export const chosenSortOption = createAction<string>('offers/chosenSortOption');
export const loadOffers = createAction<OffersProps[]>('data/loadOffers');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
// export const loadUser = createAction<UserData>('user/loadUser');
// export const sortedOffersBySortOption = createAction<OffersProps>('offers/sortedOffersBySortOption');
export const reset = createAction('offers/reset');
export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
