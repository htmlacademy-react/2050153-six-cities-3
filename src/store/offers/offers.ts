import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_CITY, INITIAL_SORT_TYPE, NameSpace } from '../../const';
import { Offers } from '../../types/state';
import { fetchOffers } from '../api-actions';
import { getCurrentSortedOffers } from '../../utils/page-utils';
import { OffersProps } from '../../types/offer';

const initialState: Offers = {
  offers: [],
  isOffersDataLoading: false,
  city: INITIAL_CITY,
  sortOption: INITIAL_SORT_TYPE,
  sortedOffers: [],
  offersByCity: [],
};

export const offers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    chosenCity: (state, action: PayloadAction<{city: string; allOffers: OffersProps[]}>) => {
      const {city, allOffers} = action.payload;

      state.city = city;
      state.offersByCity = allOffers.filter((offer) => offer.city.name === city);
      state.sortedOffers = getCurrentSortedOffers(state.offersByCity, state.sortOption);
    },
    chosenSortOption: (state, action: PayloadAction<{sortOption: string}>) => {
      const {sortOption} = action.payload;

      if (state.sortOption !== sortOption) {
        state.sortOption = sortOption;
        state.sortedOffers = getCurrentSortedOffers(state.offersByCity, sortOption);
      }
    },
    updateOffersFavorite: (state, action: PayloadAction<{favoriteStatus: boolean; offerId: string}>) => {
      const{favoriteStatus, offerId} = action.payload;
      const renewedOffers: OffersProps[] = [];

      state.offers.forEach((offer) => {
        if (offer.id === offerId) {
          offer.isFavorite = favoriteStatus;
        }
        renewedOffers.push(offer);
      });

      state.offers = renewedOffers;
      state.offersByCity = state.offers.filter((offer) => offer.city.name === state.city);
      state.sortedOffers = getCurrentSortedOffers(state.offersByCity, state.sortOption);
    },
    resetOffersFavorite: (state) => {
      const renewedOffers: OffersProps[] = [];

      state.offers.forEach((offer) => {
        if (offer.isFavorite) {
          offer.isFavorite = false;
        }
        renewedOffers.push(offer);
      });

      state.offers = renewedOffers;
      state.offersByCity = state.offers.filter((offer) => offer.city.name === state.city);
      state.sortedOffers = getCurrentSortedOffers(state.offersByCity, state.sortOption);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      });
  }
});

export const {chosenCity, chosenSortOption, updateOffersFavorite, resetOffersFavorite} = offers.actions;
