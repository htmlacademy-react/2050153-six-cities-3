import MemoizedOfferReview from './offer-review';
import MemoizedOfferReviewForm from './offer-review-form';
import { AuthorizationStatus } from '../../../const';
import { ReviewsProps } from '../../../types/review';
import { useAppSelector } from '../../../hooks';
import { getOfferReviews } from '../../../store/current-offer-reviews/selectors';
import { memo } from 'react';

type OfferReviewListProps = {
  authorizationStatus: AuthorizationStatus;
  id: string;
}

function OfferReviewList({authorizationStatus, id}: OfferReviewListProps): JSX.Element {
  const offerReviews = useAppSelector(getOfferReviews);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{offerReviews ? offerReviews.length : 0}</span></h2>
      {offerReviews ?
        (
          <ul className="reviews__list">
            {offerReviews.map((review: ReviewsProps) => (
              <MemoizedOfferReview
                key={review.id}
                offerReview={review}
              />
            ))}
          </ul>
        ) : <p>This offer do not have any reviews.</p>}
      {
        authorizationStatus === AuthorizationStatus.Auth ?
          <MemoizedOfferReviewForm id={id} />
          : <b>Only authorized user could leave a review. Please Sign in</b>
      }
    </section>
  );
}

const MemoizedOfferReviewList = memo(OfferReviewList);

export default MemoizedOfferReviewList;
