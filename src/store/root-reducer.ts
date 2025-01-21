import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offers } from './offers/offers';
import { currentOffer } from './current-offer/current-offer';
import { offerReviews } from './current-offer-reviews/current-offer-reviews';
import { userProcess } from './user-process/user-process';
import { nearOffers } from './near-offers/near-offers';
import { favoriteOffersData } from './favorite-offers-data/favorite-offers-data';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offers.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.CurrentOffer]: currentOffer.reducer,
  [NameSpace.CurrentOfferReviews]: offerReviews.reducer,
  [NameSpace.NearOffers]: nearOffers.reducer,
  [NameSpace.FavoritesData]: favoriteOffersData.reducer,
});
