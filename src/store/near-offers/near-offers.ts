import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { NearOffersData } from '../../types/state';
import { fetchNearOffers } from '../api-actions';

const initialState: NearOffersData = {
  nearOffers: [],
  isNearOffersDataLoading: false,
};

export const nearOffers = createSlice({
  name: NameSpace.NearOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNearOffers.pending, (state) => {
        state.isNearOffersDataLoading = true;
      })
      .addCase(fetchNearOffers.rejected, (state) => {
        state.isNearOffersDataLoading = false;
      })
      .addCase(fetchNearOffers.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
        state.isNearOffersDataLoading = false;
      });
  }
});
