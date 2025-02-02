import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import { OfferProps, OffersProps } from './offer';
import { UserData } from './user';
import { ReviewsProps } from './review';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user?: UserData;
};

export type Offers = {
  offers: OffersProps[];
  isOffersDataLoading: boolean;
  city: string;
  sortOption: string;
  sortedOffers: OffersProps[];
  offersByCity: OffersProps[];
};

export type CurrentOfferData = {
  currentOffer?: OfferProps;
  isOfferDataLoading: boolean;
};

export type NearOffersData = {
  nearOffers?: OffersProps[];
  isNearOffersDataLoading: boolean;
};

export type CurrentOfferReviews = {
  offerReviews: ReviewsProps[];
  isReviewsDataLoading: boolean;
};

export type FavoriteOffersData = {
  favoriteOffers: OffersProps[];
  isFavoriteOffersDataLoading: boolean;
  isFavoriteOfferAdding: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
