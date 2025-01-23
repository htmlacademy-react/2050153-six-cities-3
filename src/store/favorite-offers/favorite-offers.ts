import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoriteOffersData } from '../../types/state';
import { addFavoriteOffer, fetchFavoriteOffers } from '../api-actions';

const initialState: FavoriteOffersData = {
  favoriteOffers: [],
  isFavoriteOffersDataLoading: false,
  isfavoriteOfferAdding: false,
};

export const favoriteOffersData = createSlice({
  name: NameSpace.FavoritesData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersDataLoading = false;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersDataLoading = false;
      })
      .addCase(addFavoriteOffer.pending, (state) => {
        state.isfavoriteOfferAdding = true;
      })
      .addCase(addFavoriteOffer.rejected, (state) => {
        state.isfavoriteOfferAdding = false;
      })
      .addCase(addFavoriteOffer.fulfilled, (state, action) => {
        state.isfavoriteOfferAdding = false;
        if (action.payload.isFavorite) {
          state.favoriteOffers = [...state.favoriteOffers, action.payload];
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
        }
      });
  }
});
