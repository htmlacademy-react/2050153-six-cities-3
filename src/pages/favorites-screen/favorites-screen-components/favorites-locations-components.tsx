import { Link } from 'react-router-dom';
import CardComponent from '../../../components/card-component/card-component';
import { AppRoute, Cities } from '../../../const';
import { OffersProps } from '../../../types/offer';

type FavoritesLocationsProps = {
  offers: OffersProps[];
}

function FavoritesLocationsComponents({offers}: FavoritesLocationsProps): JSX.Element {
  console.log(offers);
  return (
    <>
      {Cities.map((city: string) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`${AppRoute.Main}`}>
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
