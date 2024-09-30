import CardComponent from '../../components/card-component/card-component';
import {cards} from '../../components/card-component/card-data';
import PlaceSortingComponent from './main-screen-components/place-sorting-component';
import Header from '../../components/header/header';
import LocationsTabList from './main-screen-components/locations-tab-list';

type MainScreenProps = {
  offersCount: number;
}

function MainScreen({offersCount}: MainScreenProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsTabList />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <PlaceSortingComponent />
              <div className="cities__places-list places__list tabs__content">
                {cards.map((card) => (
                  <CardComponent
                    key={card.id}
                    title={card.title}
                    type={card.type}
                    price={card.price}
                    isPremium={card.isPremium}
                    rating={card.rating}
                    previewImage={card.previewImage}
                  />
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
