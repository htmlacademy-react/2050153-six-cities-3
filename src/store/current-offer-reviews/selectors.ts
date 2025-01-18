import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { ReviewsProps } from '../../types/review';

export const getOfferReviews = (state: State): ReviewsProps[] => state[NameSpace.CurrentOfferReviews].offerReviews;
export const getReviewsLoadingStatus = (state: State): boolean => state[NameSpace.CurrentOfferReviews].isReviewsDataLoading;
