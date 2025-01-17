import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, INITIAL_CITY, INITIAL_SORT_TYPE } from '../../const';
import { OffersProcess } from '../../types/state';
import { OffersProps } from '../../types/offer';
import { getCurrentSortedOffers } from '../../utils/page-utils';

const initialState: OffersProcess = {
  city: INITIAL_CITY,
  sortOption: INITIAL_SORT_TYPE,
  sortedOffers: [],
  offersByCity: [],
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    chosenCity: (state, action: PayloadAction<{city: string; offers: OffersProps[]}>) => {
      const {city, offers} = action.payload;

      state.city = city;
      state.offersByCity = offers.filter((offer) => offer.city.name === city);
      state.sortedOffers = getCurrentSortedOffers(state.offersByCity, state.sortOption);
    },
    chosenSortOption: (state, action: PayloadAction<{sortOption: string}>) => {
      const {sortOption} = action.payload;

      if (state.sortOption !== sortOption) {
        state.sortOption = sortOption;
        state.sortedOffers = getCurrentSortedOffers(state.offersByCity, sortOption);
      }
    },
  },
});

export const {chosenCity, chosenSortOption} = offersProcess.actions;
