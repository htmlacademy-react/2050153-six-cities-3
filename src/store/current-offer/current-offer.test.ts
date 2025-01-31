import { currentOffer } from './current-offer';
import { makeFakeOffer } from '../../utils/mocks';
import { fetchCurrentOffer } from '../api-actions';

describe('CurrentOffer Slice', () => {
  const offer = makeFakeOffer();

  const defaultInitialState = {
    currentOffer: undefined,
    isOfferDataLoading: false,
  };

  const state = {
    currentOffer: offer,
    isOfferDataLoading: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = state;

    const result = currentOffer.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = defaultInitialState;

    const result = currentOffer.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return offer with "fetchCurrentOffer.fulfilled" action', () => {
    const initialState = defaultInitialState;
    const expectedState = state;

    const result = currentOffer.reducer(initialState, fetchCurrentOffer.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with "fetchCurrentOffer.rejected" action', () => {
    const initialState = state;
    const expectedState = defaultInitialState;

    const result = currentOffer.reducer(initialState, fetchCurrentOffer.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should return "isOfferDataLoading" with "true" with "fetchCurrentOffer.pending" action', () => {
    const initialState = defaultInitialState;
    const expectedState = { isOfferDataLoading: true };

    const result = currentOffer.reducer(initialState, fetchCurrentOffer.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set offer - isFavorite to "false" with "resetCurrentOfferFavorite" action', () => {
    const initialState = state;

    if (state.currentOffer) {
      state.currentOffer.isFavorite = false;
    }

    const expectedState = state.currentOffer.isFavorite = false;

    const result = currentOffer.reducer(initialState, currentOffer.actions.resetCurrentOfferFavorite());
    expect(result).toEqual(expectedState);
  });
});
