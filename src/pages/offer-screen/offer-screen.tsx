import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { reviews } from '../../mocks/reviews';
import OfferGalleryComponent from './offer-screen-components/offer-gallery-component';
import OfferComponent from './offer-screen-components/offer-component';
import OfferReviewListComponent from './offer-screen-components/offer-review-list-component';
import OfferReviewFormComponent from './offer-screen-components/offer-review-form-component';
import CardComponent from '../../components/card-component/card-component';
import { CardProps, OffersProps } from '../../types/offer';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AuthorizationStatus } from '../../const';

type OfferScreenProps = {
  offers: OffersProps[];
  authorizationStatus: AuthorizationStatus;
}

function OfferScreen({offers, authorizationStatus}: OfferScreenProps): JSX.Element {
  const { id } = useParams();
  const [activeOffer, setActiveOffer] = useState<CardProps>();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(activeOffer);
  });

  const currentOffer: OffersProps | undefined = offers.find((offer: OffersProps) => offer.id === id);

  if (!currentOffer) {
    return <NotFoundScreen />;
  }

  const handleHover = (offer?: CardProps) => {
    setActiveOffer(offer);
  };

  return (
    <main className="page__main page__main--offer">
      <section className="offer" key={currentOffer.id}>
        {currentOffer.images ?
          <OfferGalleryComponent
            id={currentOffer.id}
            images={currentOffer.images}
          /> : null}
        <div className="offer__container container">
          <div className="offer__wrapper">
            <OfferComponent
              key={currentOffer.id}
              id={currentOffer.id}
              title={currentOffer.title}
              type={currentOffer.type}
              price={currentOffer.price}
              isPremium={currentOffer.isPremium}
              rating={currentOffer.rating}
              description={currentOffer.description}
              bedrooms={currentOffer.bedrooms}
              goods={currentOffer.goods}
              host={currentOffer.host}
              maxAdults={currentOffer.maxAdults}
              city={{
                name: currentOffer.city.name,
                location: {
                  latitude: currentOffer.location.latitude,
                  longitude: currentOffer.location.longitude,
                  zoom: currentOffer.location.zoom
                }
              }}
              location={{
                latitude: currentOffer.location.latitude,
                longitude: currentOffer.location.longitude,
                zoom: currentOffer.location.zoom
              }}
              isFavorite={currentOffer.isFavorite}
            />
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
              <ul className="reviews__list">
                {reviews.map((review) => (
                  <OfferReviewListComponent
                    key={review.id}
                    id={review.id}
                    date={review.date}
                    user={review.user}
                    comment={review.comment}
                    rating={review.rating}
                  />
                ))}
              </ul>
              {
                authorizationStatus === AuthorizationStatus.Auth ?
                  <OfferReviewFormComponent />
                  : <p>Только авторизированные пользователи могут оставлять коментарий</p>
              }
            </section>
          </div>
        </div>
        <section className="offer__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {offers.map((offer: CardProps) => (
              <CardComponent
                key={offer.id}
                offer={offer}
                handleHover={handleHover}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferScreen;
