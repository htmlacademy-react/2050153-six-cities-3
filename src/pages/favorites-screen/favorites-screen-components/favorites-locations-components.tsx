import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardComponent from '../../../components/card-component/card-component';
import { Cities } from '../../../const';
import { CardProps, OffersProps } from '../../../types/offer';

type FavoritesLocationsProps = {
  offers: OffersProps[];
}

function FavoritesLocationsComponents({offers}: FavoritesLocationsProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<CardProps>();
  const handleHover = (offer?: CardProps) => {
    setActiveOffer(offer);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(activeOffer);
  });

  return (
    <>
      {Cities.map((city: string) => (
        // eslint-disable-next-line react/jsx-key
        <li className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#todo">
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {offers.map((offer) => (
              offer.isFavorite && (offer.city.name === city) ?
                (
                  <CardComponent
                    key={offer.id}
                    offer={offer}
                    handleHover={handleHover}
                  />
                )
                : null
            ))}
          </div>
        </li>
      ))}
    </>
  );
}

export default FavoritesLocationsComponents;
