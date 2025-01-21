import { createSlice } from '@reduxjs/toolkit';
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
  reducers: {},
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
