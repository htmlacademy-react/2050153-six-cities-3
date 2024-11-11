import { useState } from 'react';
import CardComponent from '../../../components/card-component/card-component';
import { CardProps, CityProps, OffersProps } from '../../../types/offer';
import PlaceSortingComponent from './place-sorting-component';
import MapComponent from '../../../components/map/map';

type OffersListProps = {
  currentCity: CityProps;
  currentOffers: OffersProps[];
  citiesClassName: string;
};

function OffersListComponent ({currentCity, currentOffers, citiesClassName}: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<CardProps['id'] | null>(null);
  const handleCardHover = (offerId: CardProps['id'] | null): void => {
    setActiveOfferId(offerId);
  };

  return (
    <div className={`${citiesClassName}__places-container container`}>
      <section className={`${citiesClassName}__places places`}>
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {currentOffers.length} places to stay in {currentCity.name}
        </b>
        <PlaceSortingComponent />
        <div className={`${citiesClassName}__places-list places__list tabs__content`}>
          {currentOffers.map((offer: CardProps) => (
            <CardComponent
              key={offer.id}
              offer={offer}
              onCardHover={handleCardHover}
              cardClassName={citiesClassName}
            />
          ))}
        </div>
      </section>
      <div className={`${citiesClassName}__right-section`}>
        <MapComponent city={currentCity} offers={currentOffers} activeOfferId={activeOfferId} mapClassName={citiesClassName} />
      </div>
    </div>
  );
}

export default OffersListComponent;
