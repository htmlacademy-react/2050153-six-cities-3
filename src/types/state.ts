import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import { OfferProps, OffersProps } from './offer';
import { UserData } from './user';
import { ReviewsProps } from './review';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user?: UserData;
};

export type OffersData = {
  offers: OffersProps[];
  isOffersDataLoading: boolean;
};

export type OffersProcess = {
  city: string;
  sortOption: string;
  sortedOffers: OffersProps[];
  offersByCity: OffersProps[];
};

export type CurrentOfferData = {
  currentOffer?: OfferProps;
  nearOffers?: OffersProps[];
  isOfferDataLoading: boolean;
};

export type CurrentOfferReviews = {
  offerReviews: ReviewsProps[];
  isReviewsDataLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
