import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OfferProps, OffersProps } from '../../types/offer';

export const getCurrentOffer = (state: State): OfferProps | undefined => state[NameSpace.CurrentOffer].currentOffer;
export const getOfferLoadingStatus = (state: State): boolean => state[NameSpace.CurrentOffer].isOfferDataLoading;
export const getNearOffers = (state: State): OffersProps[] | undefined => state[NameSpace.CurrentOffer].nearOffers;
