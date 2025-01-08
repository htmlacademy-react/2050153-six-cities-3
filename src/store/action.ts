import { createAction } from '@reduxjs/toolkit';
import { CityProps, OfferProps, OffersProps } from '../types/offer';
import { AppRoute, AuthorizationStatus } from '../const';
import { UserData } from '../types/user';
import { ReviewsProps } from '../types/review';

export const chosenCity = createAction<CityProps['name']>('offers/chosenCity');
export const chosenSortOption = createAction<string>('offers/chosenSortOption');
export const loadOffers = createAction<OffersProps[]>('data/loadOffers');
export const loadCurrentOffer = createAction<OfferProps>('data/loadCurrentOffer');
export const loadNearbyOffers = createAction<OffersProps[]>('data/loadNearbyOffers');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const loadUser = createAction<UserData>('user/loadUser');
export const reset = createAction('offers/reset');
export const redirectToRoute = createAction<AppRoute | string > ('offers/redirectToRoute');
export const chosenOfferId = createAction<OffersProps['id']>('offers/chosenOfferId');
export const loadOfferReviews = createAction<ReviewsProps[]>('data/loadOfferReviews');
