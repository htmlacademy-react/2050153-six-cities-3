import { offerReviews } from './current-offer-reviews';
import { makeFakeOfferReview } from '../../utils/mocks';
import { fetchOfferReviews, postReviewAction } from '../api-actions';
import { random } from 'faker';
import { getRandomInteger } from '../../utils/utils';

describe('OfferReviews Slice', () => {
  const currentOfferReviews = random.arrayElements([makeFakeOfferReview()], getRandomInteger(0, 10));

  const defaultInitialState = {
    offerReviews: [],
    isReviewsDataLoading: false,
  };

  const state = {
    offerReviews: currentOfferReviews,
    isReviewsDataLoading: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = state;

    const result = offerReviews.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = defaultInitialState;

    const result = offerReviews.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return offer reviews with "fetchOfferReviews.fulfilled" action', () => {
    const initialState = defaultInitialState;
    const expectedState = state;

    const result = offerReviews.reducer(initialState, fetchOfferReviews.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should return empty offer reviews with "fetchOfferReviews.rejected" action', () => {
    const initialState = state;
    const expectedState = defaultInitialState;

    const result = offerReviews.reducer(initialState, fetchOfferReviews.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should return "isOfferDataLoading" with "true" with "fetchOfferReviews.pending" action', () => {
    const initialState = defaultInitialState;
    const expectedState = {
      offerReviews: [],
      isReviewsDataLoading: true,
    };

    const result = offerReviews.reducer(initialState, fetchOfferReviews.pending);
    expect(result).toEqual(expectedState);
  });

  it('should return offer reviews with "postReviewAction.fulfilled" action', () => {
    const newReview = makeFakeOfferReview();

    const initialState = defaultInitialState;
    const expectedState = {
      offerReviews: currentOfferReviews.push(newReview),
      isReviewsDataLoading: false,
    };

    const result = offerReviews.reducer(initialState, postReviewAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should return empty offer reviews with "postReviewAction.rejected" action', () => {
    const initialState = state;
    const expectedState = state;

    const result = offerReviews.reducer(initialState, postReviewAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should return "isOfferDataLoading" with "true" with "postReviewAction.pending" action', () => {
    const initialState = state;
    const expectedState = {
      offerReviews: currentOfferReviews,
      isReviewsDataLoading: true,
    };

    const result = offerReviews.reducer(initialState, postReviewAction.pending);
    expect(result).toEqual(expectedState);
  });
});
