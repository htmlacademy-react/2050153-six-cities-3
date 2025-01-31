import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OffersProps } from '../../types/offer';

export const getOffers = (state: Pick<State, NameSpace.Offers>): OffersProps[] => state[NameSpace.Offers].offers;
export const getOffersDataLoadingStatus = (state: Pick<State, NameSpace.Offers>): boolean => state[NameSpace.Offers].isOffersDataLoading;
export const getCity = (state: Pick<State, NameSpace.Offers>): string => state[NameSpace.Offers].city;
export const getSortOption = (state: Pick<State, NameSpace.Offers>): string => state[NameSpace.Offers].sortOption;
export const getSortedOffers = (state: Pick<State, NameSpace.Offers>): OffersProps[] => state[NameSpace.Offers].sortedOffers;
export const getOffersByCity = (state: Pick<State, NameSpace.Offers>): OffersProps[] => state[NameSpace.Offers].offersByCity;
