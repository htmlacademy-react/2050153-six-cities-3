import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OffersProps } from '../../types/offer';

export const getNearOffersLoadingStatus = (state: State): boolean => state[NameSpace.NearOffers].isNearOffersDataLoading;
export const getNearOffers = (state: State): OffersProps[] | undefined => state[NameSpace.NearOffers].nearOffers;
