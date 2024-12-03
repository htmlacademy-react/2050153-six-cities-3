import { createReducer } from '@reduxjs/toolkit';
import { chosenCity, reset, chosenSortOption } from './action';
import { generateOffers } from '../mocks/offers';
import { Setting, SortOptions } from '../const';
import { OfferProps } from '../types/offer';
import { cities } from '../mocks/city-locations';

const INITIAL_CITY = cities[0].name;
const INITIAL_SORT_TYPE = SortOptions[0];
const OFFERS_COUNT = Setting.OffersCount;
const offers: OfferProps[] = generateOffers(OFFERS_COUNT);

const initialState = {
  city: INITIAL_CITY,
  sortOption: INITIAL_SORT_TYPE,
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chosenCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(chosenSortOption, (state, action) => {
      state.sortOption = action.payload;
    })
    .addCase(reset, (state) => {
      state.city = INITIAL_CITY;
      state.sortOption = INITIAL_SORT_TYPE;
    });
});

export { reducer, INITIAL_SORT_TYPE };
