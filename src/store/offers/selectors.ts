import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OffersProps } from '../../types/offer';

export const getOffers = (state: State): OffersProps[] => state[NameSpace.Offers].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isOffersDataLoading;
export const getCity = (state: State): string => state[NameSpace.Offers].city;
export const getSortOption = (state: State): string => state[NameSpace.Offers].sortOption;
export const getSortedOffers = (state: State): OffersProps[] => state[NameSpace.Offers].sortedOffers;
export const getOffersByCity = (state: State): OffersProps[] => state[NameSpace.Offers].offersByCity;
