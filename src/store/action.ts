import { createAction } from '@reduxjs/toolkit';
import { CityProps, OffersProps } from '../types/offer';
import { AuthorizationStatus } from '../const';

export const chosenCity = createAction<CityProps['name']>('offers/chosenCity');
export const chosenSortOption = createAction<string>('offers/chosenSortOption');
export const loadOffers = createAction<OffersProps[]>('data/loadOffers');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string | null>('offers/setError');
// export const sortedOffersBySortOption = createAction<OffersProps>('offers/sortedOffersBySortOption');
export const reset = createAction('offers/reset');
