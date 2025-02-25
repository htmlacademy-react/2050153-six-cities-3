import { favoriteOffersData } from './favorite-offers';
import { makeFakeFavoriteOffer, makeFakeOffer } from '../../utils/mocks';
import { fetchFavoriteOffers, addFavoriteOffer } from '../api-actions';
import { getRandomInteger } from '../../utils/utils';

describe('FavoriteOffersData Slice', () => {
  const userFavoriteOffers = Array.from(
    {length: getRandomInteger(1, 20)},
    () => makeFakeFavoriteOffer());

  const defaultInitialState = {
    favoriteOffers: [],
    isFavoriteOffersDataLoading: false,
    isFavoriteOfferAdding: false,
  };

  const state = {
    favoriteOffers: userFavoriteOffers,
    isFavoriteOffersDataLoading: false,
    isFavoriteOfferAdding: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = state;

    const result = favoriteOffersData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = defaultInitialState;

    const result = favoriteOffersData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return favorite offers reviews with "fetchFavoriteOffers.fulfilled" action', () => {
    const initialState = defaultInitialState;
    const expectedState = state;

    const result = favoriteOffersData.reducer(initialState, fetchFavoriteOffers.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should return empty favorite offers reviews with "fetchFavoriteOffers.rejected" action', () => {
    const initialState = state;
    const expectedState = defaultInitialState;

    const result = favoriteOffersData.reducer(initialState, fetchFavoriteOffers.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should return "isFavoriteOffersDataLoading" with "true" with "fetchOfferReviews.pending" action', () => {
    const initialState = defaultInitialState;
    const expectedState = {
      favoriteOffers: [],
      isFavoriteOffersDataLoading: true,
      isFavoriteOfferAdding: false,
    };

    const result = favoriteOffersData.reducer(initialState, fetchFavoriteOffers.pending);
    expect(result).toEqual(expectedState);
  });

  it('should return offer reviews with "addFavoriteOffer.fulfilled" action', () => {
    const newOffer = makeFakeOffer();
    let newFavoriteOffers = userFavoriteOffers;

    if (newOffer.isFavorite) {
      newFavoriteOffers = [...newFavoriteOffers, newOffer];
    } else {
      newFavoriteOffers = newFavoriteOffers.filter((offer) => offer.id !== newOffer.id);
    }

    const initialState = defaultInitialState;
    const expectedState = {
      favoriteOffers: newFavoriteOffers,
      isFavoriteOffersDataLoading: false,
      isFavoriteOfferAdding: false,
    };

    const result = favoriteOffersData.reducer(initialState, addFavoriteOffer.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should return state with "addFavoriteOffer.rejected" action', () => {
    const initialState = state;
    const expectedState = state;

    const result = favoriteOffersData.reducer(initialState, addFavoriteOffer.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should return "isFavoriteOfferAdding" with "true" with "addFavoriteOffer.pending" action', () => {
    const initialState = state;
    const expectedState = {
      favoriteOffers: userFavoriteOffers,
      isFavoriteOffersDataLoading: false,
      isFavoriteOfferAdding: true,
    };

    const result = favoriteOffersData.reducer(initialState, addFavoriteOffer.pending);
    expect(result).toEqual(expectedState);
  });

  it('should reset to default initial state with "resetFavoriteOffers" action', () => {
    const initialState = state;
    const expectedState = defaultInitialState;

    const result = favoriteOffersData.reducer(initialState, favoriteOffersData.actions.resetFavoriteOffers());
    expect(result).toEqual(expectedState);
  });
});
