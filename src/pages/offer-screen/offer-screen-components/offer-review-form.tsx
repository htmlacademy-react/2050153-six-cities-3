import { RatingStars } from '../../../const';
import { FormEvent, Fragment, ReactEventHandler, useState } from 'react';
import { postReviewAction } from '../../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../../hooks';

type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>

function OfferReviewForm(): JSX.Element {
  const [review, setReview] = useState({rating: 0, comment: ''});
  const currentOfferId = useAppSelector((state) => state.currentOfferId);

  const handleChange: ChangeHandler = (event) => {
    const {name, value} = event.currentTarget;
    setReview({...review, [name]: value});
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (review.rating !== null && review.comment !== null && currentOfferId !== null) {
      const ratingNumber = Number(review.rating);
      dispatch(postReviewAction({
        rating: ratingNumber,
        comment: review.comment,
        offerId: currentOfferId,
      }));
    }
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RatingStars.map(({value, title}) => (
          <Fragment key={value}>
            <input className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value} stars`}
              type="radio"
              onChange={handleChange}
            />
            <label htmlFor={`${value} stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChange}
        defaultValue={''}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating </span>
          and describe your stay with at least
          <b className="reviews__text-amount"> 50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={(review.comment.length < 50) && (Number(review.rating) === 0)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default OfferReviewForm;
