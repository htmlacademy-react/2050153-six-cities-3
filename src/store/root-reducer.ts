import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offersData } from './offers-data/offers-data';
import { offersProcess } from './offers-process/offers-process';
import { currentOffer } from './current-offer/current-offer';
import { offerReviews } from './current-offer-reviews/current-offer-reviews';
import { userProcess } from './user-process/user-process';
import { nearOffers } from './near-offers/near-offers';
import { favoriteOffersData } from './favorite-offers-data/favorite-offers-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.CurrentOffer]: currentOffer.reducer,
  [NameSpace.CurrentOfferReviews]: offerReviews.reducer,
  [NameSpace.NearOffers]: nearOffers.reducer,
  [NameSpace.FavoritesData]: favoriteOffersData.reducer,
});
