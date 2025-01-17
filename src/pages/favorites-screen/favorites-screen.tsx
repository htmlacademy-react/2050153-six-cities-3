import { MemoizedFavoritesLocations } from './favorites-screen-components/favorites-locations';
import { OffersProps } from '../../types/offer';
import { AuthorizationStatus } from '../../const';

type FavoritesScreenProps = {
  offers: OffersProps[];
  authorizationStatus: AuthorizationStatus;
}

function FavoritesScreen({offers, authorizationStatus}: FavoritesScreenProps): JSX.Element {
  const favoriteClassName = 'favorites';
  return (
    <main className={`page__main page__main--${favoriteClassName}`}>
      <div className={`page__${favoriteClassName}-container container`}>
        <section className={favoriteClassName}>
          <h1 className={`${favoriteClassName}__title`}>Saved listing</h1>
          <ul className={`${favoriteClassName}__list`}>
            <MemoizedFavoritesLocations offers={offers} favoritesClassName={favoriteClassName} authorizationStatus={authorizationStatus} />
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesScreen;
