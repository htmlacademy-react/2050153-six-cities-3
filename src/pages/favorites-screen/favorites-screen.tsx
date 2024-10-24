import FavoritesLocationsComponents from './favorites-screen-components/favorites-locations-components';
import { OffersProps } from '../../types/offer';

type FavoritesScreenProps = {
  offers: OffersProps[];
}

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <FavoritesLocationsComponents offers={offers} />
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesScreen;
