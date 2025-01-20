import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OfferProps } from '../../types/offer';

export const getCurrentOffer = (state: State): OfferProps | undefined => state[NameSpace.CurrentOffer].currentOffer;
export const getOfferLoadingStatus = (state: State): boolean => state[NameSpace.CurrentOffer].isOfferDataLoading;
