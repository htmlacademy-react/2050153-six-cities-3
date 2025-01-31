import { random } from 'faker';
import { cities, NameSpace, SortOptions } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import { getCurrentSortedOffers } from '../../utils/page-utils';
import { getRandomInteger } from '../../utils/utils';
import { getOffers, getCity, getOffersByCity, getOffersDataLoadingStatus, getSortOption, getSortedOffers } from './selectors';

describe('Offers selectors', () => {
  const allOffers = random.arrayElements([makeFakeOffer()], 100);
  const chosenCity = cities[getRandomInteger(0, cities.length)].name;
  const sortingOption = SortOptions[getRandomInteger(0, SortOptions.length)];
  const allOffersByCity = allOffers.filter((offer: { city: { name: string } }) => offer.city.name === chosenCity);
  const sortOffers = getCurrentSortedOffers(allOffersByCity, sortingOption);

  const state = {
    [NameSpace.Offers]: {
      offers: allOffers,
      isOffersDataLoading: true,
      city: chosenCity,
      sortOption: sortingOption,
      sortedOffers: sortOffers,
      offersByCity: allOffersByCity,
    }
  };

  it('getOffers should return offers from state', () => {
    const { offers } = state[NameSpace.Offers];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });

  it('getCity should return chosen city from state', () => {
    const { city } = state[NameSpace.Offers];
    const result = getCity(state);
    expect(result).toBe(city);
  });

  it('getOffersByCity should return offers filtered by the city name', () => {
    const { offersByCity } = state[NameSpace.Offers];
    const result = getOffersByCity(state);
    expect(result).toEqual(offersByCity);
  });

  it('getOffersDataLoadingStatus should return offers data loading status', () => {
    const { isOffersDataLoading } = state[NameSpace.Offers];
    const result = getOffersDataLoadingStatus(state);
    expect(result).toBe(isOffersDataLoading);
  });

  it('getSortOption should return sort option from state', () => {
    const { sortOption } = state[NameSpace.Offers];
    const result = getSortOption(state);
    expect(result).toBe(sortOption);
  });

  it('getSortedOffers should return offers filtered by the city name and sort option', () => {
    const { sortedOffers } = state[NameSpace.Offers];
    const result = getSortedOffers(state);
    expect(result).toEqual(sortedOffers);
  });
});
