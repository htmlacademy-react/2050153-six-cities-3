import { random } from 'faker';
import { NameSpace } from '../../const';
import { makeFakeFavoriteOffer } from '../../utils/mocks';
import { getRandomInteger } from '../../utils/utils';
import { getFavoriteOffers, getFavoriteOffersDataLoadingStatus, getFavoriteOfferAddStatus } from './selectors';

describe('FavoritesOffers selectors', () => {
  const userFavoriteOffers = random.arrayElements([makeFakeFavoriteOffer()], getRandomInteger(1, 20));

  const state = {
    [NameSpace.FavoritesData]: {
      favoriteOffers: userFavoriteOffers,
      isFavoriteOffersDataLoading: false,
      isFavoriteOfferAdding: false,
    }
  };

  it('getFavoriteOffers should return offer reviews from state', () => {
    const { favoriteOffers } = state[NameSpace.FavoritesData];
    const result = getFavoriteOffers(state);
    expect(result).toEqual(favoriteOffers);
  });

  it('getFavoriteOffersDataLoadingStatus should return favorite offers data loading status', () => {
    const { isFavoriteOffersDataLoading } = state[NameSpace.FavoritesData];
    const result = getFavoriteOffersDataLoadingStatus(state);
    expect(result).toBe(isFavoriteOffersDataLoading);
  });

  it('getFavoriteOfferAddStatus should return favorite offer adding status', () => {
    const { isFavoriteOfferAdding } = state[NameSpace.FavoritesData];
    const result = getFavoriteOfferAddStatus(state);
    expect(result).toBe(isFavoriteOfferAdding);
  });
});
