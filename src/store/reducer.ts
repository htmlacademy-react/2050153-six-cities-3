import { createReducer} from '@reduxjs/toolkit';
import { chosenCity, reset, chosenSortOption, loadOffers, setOffersDataLoadingStatus, requireAuthorization, loadCurrentOffer, loadNearbyOffers, loadOfferReviews, loadUser, loadNewReview } from './action';
import { INITIAL_CITY, INITIAL_SORT_TYPE, AuthorizationStatus } from '../const';
import { OfferProps, OffersProps } from '../types/offer';
import { getCurrentSortedOffers } from '../utils/page-utils';
import { ReviewsProps } from '../types/review';
import { UserData } from '../types/user';

type InitalState = {
  offers: OffersProps[];
  isOffersDataLoading: boolean;
  city: string;
  offersByCity?: OffersProps[];
  sortOption: string;
  sortedOffers: OffersProps[];
  authorizationStatus: AuthorizationStatus;
  currentOffer: OfferProps | undefined;
  nearOffers?: OffersProps[];
  offerReviews: ReviewsProps[];
  user?: UserData;
}

const initialState: InitalState = {
  city: INITIAL_CITY,
  offers: [],
  sortOption: INITIAL_SORT_TYPE,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  currentOffer: undefined,
  sortedOffers: [],
  offersByCity: [],
  nearOffers: [],
  offerReviews: [],
  user: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(chosenCity, (state, action) => {
      state.city = action.payload;
      state.offersByCity = state.offers.filter((offer) => offer.city.name === state.city);
      state.sortedOffers = getCurrentSortedOffers(state.offersByCity, state.sortOption);
    })
    .addCase(chosenSortOption, (state, action) => {
      if (state.sortOption !== action.payload, state.offersByCity !== undefined) {
        state.sortOption = action.payload;
        state.sortedOffers = getCurrentSortedOffers(state.offersByCity, state.sortOption);
      }
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadOfferReviews, (state, action) => {
      state.offerReviews = action.payload;
    })
    .addCase(loadUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loadNewReview, (state, action) => {
      if (state.offerReviews) {
        state.offerReviews.push(action.payload);
      }
    })
    .addCase(reset, (state) => {
      state.city = INITIAL_CITY;
      state.offersByCity = state.offers.filter((offer) => offer.city.name === state.city);
      state.sortOption = INITIAL_SORT_TYPE;
      state.sortedOffers = getCurrentSortedOffers(state.offersByCity, state.sortOption);
    });
});

export { reducer };
