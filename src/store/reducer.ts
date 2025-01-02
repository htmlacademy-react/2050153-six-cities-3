import { createReducer } from '@reduxjs/toolkit';
import { chosenCity, reset, chosenSortOption, loadOffers, setOffersDataLoadingStatus, requireAuthorization } from './action';
// import { generateOffers } from '../mocks/offers';
import { INITIAL_CITY, INITIAL_SORT_TYPE, AuthorizationStatus } from '../const';
import { OffersProps } from '../types/offer';
// import { UserData } from '../types/user';
// import { cities } from '../mocks/city-locations';
// import { getCurrentSortedOffers } from '../utils/page-utils';

// const OFFERS_COUNT = Setting.OffersCount;

type InitalState = {
  city: string;
  offers: OffersProps[];
  sortOption: string;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  // user: UserData;
}

const initialState: InitalState = {
  city: INITIAL_CITY,
  offers: [],
  // currentOffers: offers.filter((offer) => offer.city.name === INITIAL_CITY)
  sortOption: INITIAL_SORT_TYPE,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  // user: {
  //   name: '',
  //   avatarUrl: '',
  //   isPro: false,
  //   email: '',
  //   token: ''
  // },
  // sortedOffers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chosenCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(chosenSortOption, (state, action) => {
      state.sortOption = action.payload;
    })
    // .addCase(sortedOffersBySortOption, (state, action) => {
    //   state.sortedOffers = getCurrentSortedOffers()
    // })
    .addCase(reset, (state) => {
      state.city = INITIAL_CITY;
      state.sortOption = INITIAL_SORT_TYPE;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
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
