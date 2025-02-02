import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { ReviewsProps } from '../../types/review';

export const getOfferReviews = (state: Pick<State, NameSpace.CurrentOfferReviews>): ReviewsProps[] => state[NameSpace.CurrentOfferReviews].offerReviews;
export const getReviewsLoadingStatus = (state: Pick<State, NameSpace.CurrentOfferReviews>): boolean => state[NameSpace.CurrentOfferReviews].isReviewsDataLoading;
