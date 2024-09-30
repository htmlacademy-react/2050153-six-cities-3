import Header from '../../components/header/header';
import FavoritesLocationsComponents from './favorites-screen-components/favorites-locations-components';
import Footer from '../../components/footer/footer';

function FavoritesScreen(): JSX.Element {
  return (
    <div class="page">
      <Header />

      <main class="page__main page__main--favorites">
        <div class="page__favorites-container container">
          <section class="favorites">
            <h1 class="favorites__title">Saved listing</h1>
            <ul class="favorites__list">
              <FavoritesLocationsComponents />
            </ul>
          </section>
        </div>
      </main>

      <Footer />

    </div>
  );
}

export default FavoritesScreen;
