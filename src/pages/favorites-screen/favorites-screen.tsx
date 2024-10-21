import FavoritesLocationsComponents from './favorites-screen-components/favorites-locations-components';

function FavoritesScreen(): JSX.Element {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <FavoritesLocationsComponents />
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesScreen;
