import { Link } from 'react-router-dom';
import MemoizedOfferCard from '../../../components/card/card';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { OffersProps } from '../../../types/offer';
import { memo } from 'react';
import { removeDups } from '../../../utils/utils';

type FavoritesLocationsProps = {
  offers: OffersProps[];
  favoritesClassName: string;
  authorizationStatus: AuthorizationStatus;
}

function FavoritesLocations({offers, favoritesClassName, authorizationStatus}: FavoritesLocationsProps): JSX.Element {
  const allFavoriteOffersCities = offers.map((offer) => offer.city.name);
  const favoriteOffersCities = removeDups(allFavoriteOffersCities);

  return (
    <>
      {favoriteOffersCities.map((city) => (
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
