import MemoizedOfferGallery from './offer-screen-components/offer-gallery';
import MemoizedOfferComponent from './offer-screen-components/offer-component';
import MemoizedOfferCard from '../../components/card/card';
import { CardProps } from '../../types/offer';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AuthorizationStatus } from '../../const';
import MemoizedMap from '../../components/map/map';
import { fetchCurrentOffer } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentOffer, getOfferLoadingStatus } from '../../store/current-offer/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { getNearOffers } from '../../store/near-offers/selectors';
import MemoizedOfferReviewList from './offer-screen-components/offer-review-list';

type OfferScreenProps = {
  authorizationStatus: AuthorizationStatus;
}

function OfferScreen({authorizationStatus}: OfferScreenProps): JSX.Element {
  const offerPageClassName = 'offer';
  const nearPlacesClassName = 'near-places';
  const {id} = useParams();

  const loadedNearOffers = useAppSelector(getNearOffers);
  const nearOffers = loadedNearOffers?.slice(0, 3);
  const currentOffer = useAppSelector(getCurrentOffer);
  const isOfferDataLoading = useAppSelector(getOfferLoadingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchCurrentOffer(id));
    }
  }, [dispatch, id]);

  if (isOfferDataLoading) {
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
              authorizationStatus={authorizationStatus}
            />
            <MemoizedOfferReviewList
              authorizationStatus={authorizationStatus}
              id={currentOffer.id}
            />
          </div>
        </div>
        {nearOffers ?
          (
            <MemoizedMap city={currentOffer.city} offers={nearOffers} currentOffer={currentOffer} activeOfferId={currentOffer.id} mapClassName={offerPageClassName} />
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
