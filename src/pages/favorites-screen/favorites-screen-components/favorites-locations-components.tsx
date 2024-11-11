import { Link } from 'react-router-dom';
import CardComponent from '../../../components/card-component/card-component';
import { AppRoute, Cities } from '../../../const';
import { OffersProps } from '../../../types/offer';

type FavoritesLocationsProps = {
  offers: OffersProps[];
  favoritesClassName: string;
}

function FavoritesLocationsComponents({offers, favoritesClassName}: FavoritesLocationsProps): JSX.Element {
  return (
    <>
      {Cities.map((city: string) => (
        <li className={`${favoritesClassName}__locations-items`} key={city}>
          <div className={`${favoritesClassName}__locations locations locations--current`}>
            <div className="locations__item">
              <Link className="locations__item-link" to={`${AppRoute.Main}`}>
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className={`${favoritesClassName}__places`}>
            {offers.map((offer) => (
              offer.isFavorite && (offer.city.name === city) ?
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

export default FavoritesLocationsComponents;
