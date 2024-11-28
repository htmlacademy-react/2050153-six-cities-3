import { createReducer } from '@reduxjs/toolkit';
import { chosenCity, resetCity } from './action';
import { generateOffers } from '../mocks/offers';
import { Setting } from '../const';
import { OfferProps } from '../types/offer';
import { cities } from '../mocks/city-locations';

const INITIAL_CITY = cities[0].name;
const OFFERS_COUNT = Setting.OffersCount;
const offers: OfferProps[] = generateOffers(OFFERS_COUNT);

const initialState = {
  city: INITIAL_CITY,
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chosenCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(resetCity, (state) => {
      state.city = INITIAL_CITY;
    });
});

export { reducer };
