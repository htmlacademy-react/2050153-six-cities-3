import MemoizedFavoritesLocations from './favorites-screen-components/favorites-locations';
import { AuthorizationStatus } from '../../const';
import { getFavoriteOffers } from '../../store/favorite-offers/selectors';
import { useAppSelector } from '../../hooks';

type FavoritesScreenProps = {
  authorizationStatus: AuthorizationStatus;
}

function FavoritesScreen({authorizationStatus}: FavoritesScreenProps): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const favoriteClassName = 'favorites';
  return (
    <main className={`page__main page__main--${favoriteClassName}`}>
      <div className={`page__${favoriteClassName}-container container`}>
        <section className={favoriteClassName}>
          <h1 className={`${favoriteClassName}__title`}>Saved listing</h1>
          <ul className={`${favoriteClassName}__list`}>
            <MemoizedFavoritesLocations offers={favoriteOffers} favoritesClassName={favoriteClassName} authorizationStatus={authorizationStatus} />
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesScreen;
