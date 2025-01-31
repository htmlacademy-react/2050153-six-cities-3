import { random } from 'faker';
import { nearOffers } from './near-offers';
import { makeFakeOffer } from '../../utils/mocks';
import { getRandomInteger } from '../../utils/utils';
import { fetchNearOffers } from '../api-actions';

describe('NearOffers Slice', () => {
  const allOffers = random.arrayElements([makeFakeOffer()], getRandomInteger(1, 50));
  const currentOffer = makeFakeOffer();
  const nearCurrentOfferOffers = allOffers.filter((offer) => offer.city.name === currentOffer.city.name);

  const state = {
    nearOffers: nearCurrentOfferOffers,
    isNearOffersDataLoading: false,
  };

  const defaultInitialState = {
    nearOffers: [],
    isNearOffersDataLoading: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = state;

    const result = nearOffers.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = defaultInitialState;

    const result = nearOffers.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return near offers with "ffetchNearOffers.fulfilled" action', () => {
    const initialState = defaultInitialState;
    const expectedState = state;

    const result = nearOffers.reducer(initialState, fetchNearOffers.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should return offers with "fetchNearOffers.rejected" action', () => {
    const initialState = state;
    const expectedState = defaultInitialState;

    const result = nearOffers.reducer(initialState, fetchNearOffers.rejected);
    expect(result).toEqual(expectedState);
  });

  it('isNearOffersDataLoading should return "true" with "fetchNearOffers.pending" action', () => {
    const initialState = defaultInitialState;
    const expectedState = {
      nearOffers: [],
      isNearOffersDataLoading: true,
    };

    const result = nearOffers.reducer(initialState, fetchNearOffers.pending);
    expect(result).toEqual(expectedState);
  });
});
