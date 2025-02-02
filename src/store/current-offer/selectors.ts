import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OfferProps } from '../../types/offer';

export const getCurrentOffer = (state: Pick<State, NameSpace.CurrentOffer>): OfferProps | undefined => state[NameSpace.CurrentOffer].currentOffer;
export const getOfferLoadingStatus = (state: Pick<State, NameSpace.CurrentOffer>): boolean => state[NameSpace.CurrentOffer].isOfferDataLoading;
