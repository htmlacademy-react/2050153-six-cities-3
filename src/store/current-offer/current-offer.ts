import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CurrentOfferData } from '../../types/state';
import { fetchCurrentOffer } from '../api-actions';

const initialState: CurrentOfferData = {
  currentOffer: undefined,
  isOfferDataLoading: false,
};

export const currentOffer = createSlice({
  name: NameSpace.CurrentOffer,
  initialState,
  reducers: {
    updateCurrentOfferFavoriteStatus: (state, action: PayloadAction<{favoriteStatus: boolean; offerId: string}>) => {
      const{favoriteStatus, offerId} = action.payload;

      if (state.currentOffer && state.currentOffer.id === offerId) {
        state.currentOffer.isFavorite = favoriteStatus;
      }
    },
    resetCurrentOffer: (state) => {
      if (state.currentOffer) {
        state.currentOffer.isFavorite = false;
        state = initialState;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentOffer.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchCurrentOffer.rejected, (state) => {
        state.isOfferDataLoading = false;
      })
      .addCase(fetchCurrentOffer.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.currentOffer = action.payload;
          state.isOfferDataLoading = false;
        }
      });
  }
});

export const { resetCurrentOffer, updateCurrentOfferFavoriteStatus } = currentOffer.actions;
