import MemoizedFavoritesLocations from './favorites-screen-components/favorites-locations';
import { AuthorizationStatus } from '../../const';
import { getFavoriteOffers, getFavoriteOffersDataLoadingStatus } from '../../store/favorite-offers/selectors';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';

type FavoritesScreenProps = {
  authorizationStatus: AuthorizationStatus;
}

function FavoritesScreen({authorizationStatus}: FavoritesScreenProps): JSX.Element {
  // store.dispatch(fetchFavoriteOffers());
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isFavoriteOffersDataLoading = useAppSelector(getFavoriteOffersDataLoadingStatus);
  const favoriteClassName = 'favorites';

  if (isFavoriteOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    (favoriteOffers.length !== 0) ?
      (
        <main className={`page__main page__main--${favoriteClassName}`}>
          <div className={`page__${favoriteClassName}-container container`}>
            <section className={favoriteClassName}>
              <h1 className={`${favoriteClassName}__title`}>Saved listing</h1>
              <ul className={`${favoriteClassName}__list`}>
                <MemoizedFavoritesLocations
                  offers={favoriteOffers}
                  favoritesClassName={favoriteClassName}
                  authorizationStatus={authorizationStatus}
                />
              </ul>
            </section>
          </div>
        </main>
      ) : (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          </div>
        </main>
      )
  );
}

export default FavoritesScreen;
