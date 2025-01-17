import { MemoizedOfferGallery } from './offer-screen-components/offer-gallery';
import { MemoizedOfferComponent } from './offer-screen-components/offer-component';
import { MemoizedOfferReviewList } from './offer-screen-components/offer-review-list';
import { MemoizedOfferReviewForm } from './offer-screen-components/offer-review-form';
import { MemoizedOfferCard } from '../../components/card/card';
import { CardProps } from '../../types/offer';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AuthorizationStatus } from '../../const';
import { MemoizedMap } from '../../components/map/map';
import { ReviewsProps } from '../../types/review';
import { fetchCurrentOffer, fetchNearOffers, fetchOfferReviews } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentOffer, getNearOffers, getOfferLoadingStatus } from '../../store/current-offer/selectors';
import { getOfferReviews, getReviewsLoadingStatus } from '../../store/current-offer-reviews/selectors';
import LoadingScreen from '../loading-screen/loading-screen';

type OfferScreenProps = {
  authorizationStatus: AuthorizationStatus;
}

function OfferScreen({authorizationStatus}: OfferScreenProps): JSX.Element {
  const offerPageClassName = 'offer';
  const nearPlacesClassName = 'near-places';
  const {id} = useParams();

  const nearOffers = useAppSelector(getNearOffers);
  const currentOffer = useAppSelector(getCurrentOffer);
  const offerReviews = useAppSelector(getOfferReviews);
  const isOfferDataLoading = useAppSelector(getOfferLoadingStatus);
  const isReviewsDataLoading = useAppSelector(getReviewsLoadingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchCurrentOffer(id));
      dispatch(fetchNearOffers(id));
      dispatch(fetchOfferReviews(id));
    }
  }, [dispatch, id]);

  if (isOfferDataLoading || isReviewsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (currentOffer === undefined) {
    return <NotFoundScreen />;
  }

  return (
    <main className={`page__main page__main--${offerPageClassName}`}>
      <section className={offerPageClassName}>
        {currentOffer.images ?
          <MemoizedOfferGallery
            images={currentOffer.images}
          /> : null}
        <div className={`${offerPageClassName}__container container`}>
          <div className={`${offerPageClassName}__wrapper`}>
            <MemoizedOfferComponent
              key={currentOffer.id}
              offer={currentOffer}
              offerClassName={offerPageClassName}
            />
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{offerReviews ? offerReviews.length : 0}</span></h2>
              {offerReviews ?
                (
                  <ul className="reviews__list">
                    {offerReviews.map((review: ReviewsProps) => (
                      <MemoizedOfferReviewList
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
          </div>
        </div>
        {nearOffers ?
          (
            <MemoizedMap city={currentOffer.city} offers={nearOffers} activeOfferId={currentOffer.id} mapClassName={offerPageClassName} />
          ) : null}
      </section>
      <div className="container">
        {nearOffers ?
          (
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {nearOffers.map((offer: CardProps) => (
                  <MemoizedOfferCard
                    key={offer.id}
                    offer={offer}
                    cardClassName={nearPlacesClassName}
                    authorizationStatus={authorizationStatus}
                  />
                ))}
              </div>
            </section>
          ) : null}
      </div>
    </main>
  );
}

export default OfferScreen;
