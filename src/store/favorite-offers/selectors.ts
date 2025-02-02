import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OffersProps } from '../../types/offer';

export const getFavoriteOffers = (state: Pick<State, NameSpace.FavoritesData>): OffersProps[] => state[NameSpace.FavoritesData].favoriteOffers;
export const getFavoriteOffersDataLoadingStatus = (state: Pick<State, NameSpace.FavoritesData>): boolean => state[NameSpace.FavoritesData].isFavoriteOffersDataLoading;
export const getFavoriteOfferAddStatus = (state: Pick<State, NameSpace.FavoritesData>): boolean => state[NameSpace.FavoritesData].isFavoriteOfferAdding;
