import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CurrentOfferReviews } from '../../types/state';
import { fetchOfferReviews, postReviewAction } from '../api-actions';

const initialState: CurrentOfferReviews = {
  offerReviews: [],
  isReviewsDataLoading: false,
};

export const offerReviews = createSlice({
  name: NameSpace.CurrentOfferReviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferReviews.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchOfferReviews.rejected, (state) => {
        state.isReviewsDataLoading = false;
      })
      .addCase(fetchOfferReviews.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.offerReviews = action.payload;
          state.isReviewsDataLoading = false;
        }
      })
      .addCase(postReviewAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isReviewsDataLoading = false;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.offerReviews = [action.payload, ...state.offerReviews];
        state.isReviewsDataLoading = false;
      });
  }
});
