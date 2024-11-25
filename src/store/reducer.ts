import {createReducer} from '@reduxjs/toolkit';
import { chosenCity, resetOffers } from './action';
import { generateOffers } from '../mocks/offers';
import { getCurrentOffers } from '../utils/page-utils';
import { Setting } from '../const';

const INITIAL_CITY = 'Paris';
const OFFERS_COUNT = Setting.OffersCount;
const offers = generateOffers(OFFERS_COUNT);

const initialState = {
  city: INITIAL_CITY,
  cityOffers: getCurrentOffers(offers, INITIAL_CITY),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chosenCity, (state) => {
      state.cityOffers = getCurrentOffers(offers, state.city);
    })
    .addCase(resetOffers, (state) => {
      state.city = INITIAL_CITY;
      state.cityOffers = getCurrentOffers(offers, state.city);
    });
});

export {reducer};
