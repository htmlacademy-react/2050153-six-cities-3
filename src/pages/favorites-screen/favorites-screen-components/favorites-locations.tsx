import { Link } from 'react-router-dom';
import MemoizedOfferCard from '../../../components/card/card';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { OffersProps } from '../../../types/offer';
import { cities } from '../../../const';
import { memo } from 'react';

type FavoritesLocationsProps = {
  offers: OffersProps[];
  favoritesClassName: string;
  authorizationStatus: AuthorizationStatus;
}

function FavoritesLocations({offers, favoritesClassName, authorizationStatus}: FavoritesLocationsProps): JSX.Element {
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
              offer.isFavorite && (offer.city.name === city.name) ?
                (
                  <MemoizedOfferCard
                    key={offer.id}
                    offer={offer}
                    cardClassName={favoritesClassName}
                    authorizationStatus={authorizationStatus}
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

const MemoizedFavoritesLocations = memo(FavoritesLocations);

export default MemoizedFavoritesLocations;
