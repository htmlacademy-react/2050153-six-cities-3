import { createReducer } from '@reduxjs/toolkit';
import { chosenCity, reset, chosenSortOption, loadOffers, setOffersDataLoadingStatus, requireAuthorization, chosenOfferId, loadCurrentOffer, loadNearbyOffers } from './action';
import { INITIAL_CITY, INITIAL_SORT_TYPE, AuthorizationStatus } from '../const';
import { OfferProps, OffersProps } from '../types/offer';
import { getCurrentSortedOffers } from '../utils/page-utils';
// import { UserData } from '../types/user';

type InitalState = {
  offers: OffersProps[];
  isOffersDataLoading: boolean;
  city: string;
  offersByCity?: OffersProps[];
  sortOption: string;
  sortedOffers: OffersProps[];
  authorizationStatus: AuthorizationStatus;
  currentOfferId: OffersProps['id'] | null;
  currentOffer: OfferProps | undefined;
  nearOffers?: OffersProps[];
  // user: UserData;
}

const initialState: InitalState = {
  city: INITIAL_CITY,
  offers: [],
  sortOption: INITIAL_SORT_TYPE,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  currentOfferId: null,
  currentOffer: undefined,
  sortedOffers: [],
  offersByCity: [],
  nearOffers: [],
// user: {
  //   name: '',
  //   avatarUrl: '',
  //   isPro: false,
  //   email: '',
  //   token: ''
  // },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(chosenCity, (state, action) => {
      state.city = action.payload;
      state.offersByCity = state.offers.filter((offer) => offer.city.name === state.city);
    })
    .addCase(chosenSortOption, (state, action) => {
      state.sortOption = action.payload;
      if (state.offersByCity !== undefined) {
        state.sortedOffers = getCurrentSortedOffers(state.offersByCity, state.sortOption);
      }
    })
    .addCase(reset, (state) => {
      state.city = INITIAL_CITY;
      state.offersByCity = state.offers.filter((offer) => offer.city.name === state.city);
      state.sortOption = INITIAL_SORT_TYPE;
      state.sortedOffers = getCurrentSortedOffers(state.offersByCity, state.sortOption);
    })
    .addCase(chosenOfferId, (state, action) => {
      state.currentOfferId = action.payload;
      // if (state.currentOfferId !== null) {
      // state.currentOffer = state.offers.find((offer: OffersProps) => offer.id === state.currentOfferId);
      // dispatch(loadCurrentOffer(state.currentOfferId));
      // if (state.nearOffers !== undefined && state.currentOffer !== undefined) {
      //     state.nearOffers = getNearOffers(state.offers, state.currentOffer);
      //   }
      // }
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
    });
  // .addCase(loadUser, (state, action) => {
  //   state.user = action.payload;
  // });
});

export { reducer };
