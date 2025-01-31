import { random } from 'faker';
import { cities, INITIAL_CITY, INITIAL_SORT_TYPE, SortOptions } from '../../const';
import { offers } from './offers';
import { makeFakeOffer } from '../../utils/mocks';
import { getRandomInteger } from '../../utils/utils';
import { getCurrentSortedOffers } from '../../utils/page-utils';
import { fetchOffers } from '../api-actions';
import { OffersProps } from '../../types/offer';

describe('Offers Slice', () => {
  const allOffers = random.arrayElements([makeFakeOffer()], 100);
  const chosenCity = cities[getRandomInteger(0, cities.length)].name;
  const sortingOption = SortOptions[getRandomInteger(0, SortOptions.length)];
  const allOffersByCity = allOffers.filter((offer: { city: { name: string } }) => offer.city.name === chosenCity);
  const sortOffers = getCurrentSortedOffers(allOffersByCity, sortingOption);
  const initialOffersByCity = allOffers.filter((offer: { city: { name: string } }) => offer.city.name === INITIAL_CITY);
  const initialSortOffers = getCurrentSortedOffers(allOffersByCity, INITIAL_SORT_TYPE);

  const state = {
    offers: allOffers,
    isOffersDataLoading: false,
    city: INITIAL_CITY,
    sortOption: INITIAL_SORT_TYPE,
    sortedOffers: initialSortOffers,
    offersByCity: initialOffersByCity,
  };

  const defaultInitialState = {
    offers: [],
    isOffersDataLoading: false,
    city: INITIAL_CITY,
    sortOption: INITIAL_SORT_TYPE,
    sortedOffers: [],
    offersByCity: [],
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = state;

    const result = offers.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      isOffersDataLoading: false,
      city: INITIAL_CITY,
      sortOption: INITIAL_SORT_TYPE,
      sortedOffers: [],
      offersByCity: [],
    };

    const result = offers.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return offers with "fetchOffers.fulfilled" action', () => {
    const initialState = defaultInitialState;
    const expectedState = state;

    const result = offers.reducer(initialState, fetchOffers.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should return offers with "fetchOffers.rejected" action', () => {
    const initialState = state;
    const expectedState = defaultInitialState;

    const result = offers.reducer(initialState, fetchOffers.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should return offers with "fetchOffers.pending" action', () => {
    const initialState = defaultInitialState;
    const expectedState = { isOffersDataLoading: true };

    const result = offers.reducer(initialState, fetchOffers.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set chosenCity with "chosenCity" action', () => {
    const initialState = state;
    const expectedState = {
      city: chosenCity,
      offersByCity: allOffersByCity,
      sortOption: INITIAL_SORT_TYPE,
      sortedOffers: sortOffers,
    };

    const result = offers.reducer(initialState, offers.actions.chosenCity({city: chosenCity, allOffers: allOffers}));
    expect(result).toEqual(expectedState);
  });

  it('should set sortOption with "chosenSortOption" action', () => {
    const initialState = state;
    const expectedState = {
      sortOption: sortingOption,
      sortedOffers: sortOffers,
    };

    const result = offers.reducer(initialState, offers.actions.chosenSortOption({sortOption: sortingOption}));
    expect(result).toEqual(expectedState);
  });

  it('should update offers favorite with "updateOffersFavorite" action', () => {
    const favoriteStatus = true;
    const offerId = allOffers[getRandomInteger(0, allOffers.length)].id;
    const renewedOffers: OffersProps[] = [];

    allOffers.forEach((offer) => {
      if (offer.id === offerId) {
        offer.isFavorite = favoriteStatus;
      }
      renewedOffers.push(offer);
    });

    const initialState = state;
    const expectedState = {
      offers: renewedOffers,
      offersByCity: renewedOffers.filter((offer) => offer.city.name === chosenCity),
      sortedOffers: getCurrentSortedOffers(renewedOffers.filter((offer) => offer.city.name === chosenCity), state.sortOption),
    };

    const result = offers.reducer(initialState, offers.actions.updateOffersFavorite({favoriteStatus, offerId}));
    expect(result).toEqual(expectedState);
  });

  it('should reset offers favorite to "false" with "resetOffersFavorite" action', () => {
    const favoriteStatus = false;
    const renewedOffers: OffersProps[] = [];

    allOffers.forEach((offer) => {
      if (offer.isFavorite) {
        offer.isFavorite = favoriteStatus;
      }
      renewedOffers.push(offer);
    });

    const initialState = state;
    const expectedState = {
      offers: renewedOffers,
      offersByCity: renewedOffers.filter((offer) => offer.city.name === chosenCity),
      sortedOffers: getCurrentSortedOffers(renewedOffers.filter((offer) => offer.city.name === chosenCity), state.sortOption),
    };

    const result = offers.reducer(initialState, offers.actions.resetOffersFavorite());
    expect(result).toEqual(expectedState);
  });
});
