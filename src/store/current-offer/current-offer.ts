import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CurrentOfferData } from '../../types/state';
import { fetchCurrentOffer, fetchNearOffers } from '../api-actions';

const initialState: CurrentOfferData = {
  currentOffer: undefined,
  nearOffers: [],
  isOfferDataLoading: false,
};

export const currentOffer = createSlice({
  name: NameSpace.CurrentOffer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentOffer.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchCurrentOffer.rejected, (state) => {
        // state.currentOffer = undefined;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchCurrentOffer.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.currentOffer = action.payload;
          state.isOfferDataLoading = false;
        }
      })
      .addCase(fetchNearOffers.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchNearOffers.rejected, (state) => {
        state.isOfferDataLoading = false;
      })
      .addCase(fetchNearOffers.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.nearOffers = action.payload;
          state.isOfferDataLoading = false;
        }
      });
  }
});
