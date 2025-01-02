import { Link } from 'react-router-dom';
import CardComponent from '../../../components/card/card';
import { AppRoute } from '../../../const';
import { OffersProps } from '../../../types/offer';
import { cities } from '../../../const';

type FavoritesLocationsProps = {
  offers: OffersProps[];
  favoritesClassName: string;
}

function FavoritesLocations({offers, favoritesClassName}: FavoritesLocationsProps): JSX.Element {
  return (
    <>
      {cities.map((city) => (
        <li className={`${favoritesClassName}__locations-items`} key={city.name}>
          <div className={`${favoritesClassName}__locations locations locations--current`}>
            <div className="locations__item">
              <Link className="locations__item-link" to={`${AppRoute.Main}`}>
                <span>{city.name}</span>
              </Link>
            </div>
          </div>
          <div className={`${favoritesClassName}__places`}>
            {offers.map((offer) => (
              offer.isFavorite && (offer.city === city) ?
                (
                  <CardComponent
                    key={offer.id}
                    offer={offer}
                    cardClassName={favoritesClassName}
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

export default FavoritesLocations;
