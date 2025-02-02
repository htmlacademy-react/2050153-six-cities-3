import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OffersProps } from '../../types/offer';

export const getNearOffersLoadingStatus = (state: Pick<State, NameSpace.NearOffers>): boolean => state[NameSpace.NearOffers].isNearOffersDataLoading;
export const getNearOffers = (state: Pick<State, NameSpace.NearOffers>): OffersProps[] | undefined => state[NameSpace.NearOffers].nearOffers;
