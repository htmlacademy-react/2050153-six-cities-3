import { useCallback, useState } from 'react';
import Card from '../../../components/card/card';
import { CardProps, CityProps } from '../../../types/offer';
import PlaceSorting from '../../../components/places-sorting/place-sorting';
import Map from '../../../components/map/map';
import { useAppSelector } from '../../../hooks';
import { AuthorizationStatus } from '../../../const';
import { getSortedOffers } from '../../../store/offers-process/selectors';

type OffersListProps = {
  currentCity: CityProps;
  citiesClassName: string;
  authorizationStatus: AuthorizationStatus;
};

function OffersList ({currentCity, citiesClassName, authorizationStatus}: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<CardProps['id'] | null>(null);
  const currentSortedOffers = useAppSelector(getSortedOffers);

  const handleCardHover = useCallback((offerId: CardProps['id'] | null): void => {
    setActiveOfferId(offerId);
  },[]);

  return (
    <div className={`${citiesClassName}__places-container container`}>
      <section className={`${citiesClassName}__places places`}>
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {currentSortedOffers.length} places to stay in {currentCity.name}
        </b>
        <PlaceSorting />
        <div className={`${citiesClassName}__places-list places__list tabs__content`}>
          {currentSortedOffers.map((offer: CardProps) => (
            <Card
              key={offer.id}
              offer={offer}
              onCardHover={handleCardHover}
              cardClassName={citiesClassName}
              authorizationStatus={authorizationStatus}
            />
          ))}
        </div>
      </section>
      <div className={`${citiesClassName}__right-section`}>
        <Map city={currentCity} offers={currentSortedOffers} activeOfferId={activeOfferId} mapClassName={citiesClassName} />
      </div>
    </div>
  );
}

export default OffersList;
