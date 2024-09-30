import Header from '../../components/header/header';
import {offer} from './offer-data';
import OfferGalleryComponent from './offer-screen-components/offer-gallery-component';
import OfferComponent from './offer-screen-components/offer-component';
import OfferReviewListContainer from './offer-screen-components/offer-review-list-component';
import CardOfferComponent from '../../components/card-component/card-offers-component';
import {cards} from '../../components/card-component/card-data';

const RatingStars: string[] = ['5', '4', '3', '2', '1'];

type OfferScreenProps = {
  nearOffersCount: number
}

function OfferScreen({nearOffersCount}: OfferScreenProps): JSX.Element {
  return (
    <Header />

    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGalleryComponent />
        <div className="offer__container container">
          <div className="offer__wrapper">
            <OfferComponent
              title = {offer.title}
              type = {offer.type}
              price = {offer.price}
              isPremium = {offer.isPremium}
              rating = {offer.rating}
              description = {offer.rating}
              bedrooms = {offer.badrooms}
              goods = {offer.goods}
              host = {offer.host}
              maxAdults = {offer.maxAdults}
            />
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
              <OfferReviewListContainer />
              <form className="reviews__form form" action="#" method="post">
                <label className="reviews__label form__label" for="review">Your review</label>
                <div className="reviews__rating-form form__rating">
                  {RatingStars.map((count) => (
                    <input className="form__rating-input visually-hidden" name="rating" value={count} id={{`${count} stars`}} type="radio" />
                    <label for={{`${count} stars`}} className="reviews__rating-label form__rating-label" title="perfect">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>
                  ))}
                </div>
                <textarea className="reviews__textarea form__textarea" id="review" name="review" placeHolder="Tell how was your stay, what you like and what can be improved"></textarea>
                <div className="reviews__button-wrapper">
                  <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                  </p>
                  <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <section className="offer__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {cards.map((card) => (
              <CardOfferComponent
                key={card.id}
                title={card.title}
                type={card.type}
                price={card.price}
                isPremium={card.isPremium}
                rating={card.rating}
                previewImage={card.previewImage}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
