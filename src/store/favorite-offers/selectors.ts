import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OffersProps } from '../../types/offer';

export const getFavoriteOffers = (state: State): OffersProps[] => state[NameSpace.FavoritesData].favoriteOffers;
export const getFavoriteOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.FavoritesData].isFavoriteOffersDataLoading;
export const getFavoriteOfferAddStatus = (state: State): boolean => state[NameSpace.FavoritesData].isfavoriteOfferAdding;
