import { NameSpace } from '../../const';
import { makeFakeOfferReview } from '../../utils/mocks';
import { getRandomInteger } from '../../utils/utils';
import { getOfferReviews, getReviewsLoadingStatus } from './selectors';

describe('CurrentOfferReviews selectors', () => {
  const currentOfferReviews = Array.from(
    {length: getRandomInteger(0, 10)},
    () => makeFakeOfferReview());

  const state = {
    [NameSpace.CurrentOfferReviews]: {
      offerReviews: currentOfferReviews,
      isReviewsDataLoading: false,
    }
  };

  it('getOfferReviews should return offer reviews from state', () => {
    const { offerReviews } = state[NameSpace.CurrentOfferReviews];
    const result = getOfferReviews(state);
    expect(result).toEqual(offerReviews);
  });

  it('getReviewsLoadingStatus should return offer reviews data loading status', () => {
    const { isReviewsDataLoading } = state[NameSpace.CurrentOfferReviews];
    const result = getReviewsLoadingStatus(state);
    expect(result).toBe(isReviewsDataLoading);
  });
});
