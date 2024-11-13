import FavoritesLocations from './favorites-screen-components/favorites-locations';
import { OffersProps } from '../../types/offer';

type FavoritesScreenProps = {
  offers: OffersProps[];
}

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  const favoriteClassName = 'favorites';
  return (
    <main className={`page__main page__main--${favoriteClassName}`}>
      <div className={`page__${favoriteClassName}-container container`}>
        <section className={favoriteClassName}>
          <h1 className={`${favoriteClassName}__title`}>Saved listing</h1>
          <ul className={`${favoriteClassName}__list`}>
            <FavoritesLocations offers={offers} favoritesClassName={favoriteClassName} />
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesScreen;
