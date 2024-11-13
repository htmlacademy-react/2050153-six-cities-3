import { useState } from 'react';
import Card from '../../../components/card/card';
import { CardProps, CityProps, OffersProps } from '../../../types/offer';
import PlaceSorting from './place-sorting';
import Map from '../../../components/map/map';

type OffersListProps = {
  currentCity: CityProps;
  currentOffers: OffersProps[];
  citiesClassName: string;
};

function OffersList ({currentCity, currentOffers, citiesClassName}: OffersListProps): JSX.Element {
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
        <PlaceSorting />
        <div className={`${citiesClassName}__places-list places__list tabs__content`}>
          {currentOffers.map((offer: CardProps) => (
            <Card
              key={offer.id}
              offer={offer}
              onCardHover={handleCardHover}
              cardClassName={citiesClassName}
            />
          ))}
        </div>
      </section>
      <div className={`${citiesClassName}__right-section`}>
        <Map city={currentCity} offers={currentOffers} activeOfferId={activeOfferId} mapClassName={citiesClassName} />
      </div>
    </div>
  );
}

export default OffersList;