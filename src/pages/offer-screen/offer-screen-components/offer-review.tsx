import { memo } from 'react';
import { ReviewsProps } from '../../../types/review';

type OfferReviewListProps = {
  offerReview: ReviewsProps;
}

function OfferReview({offerReview}: OfferReviewListProps): JSX.Element {
  const {id, date, user, comment, rating} = offerReview;

  return (
    <li className="reviews__item" key={id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{
              width: `${rating / 5 * 100}%`
            }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{date}</time>
      </div>
    </li>
  );
}

const MemoizedOfferReview = memo(OfferReview);

export default MemoizedOfferReview;
