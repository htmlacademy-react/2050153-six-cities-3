import CardComponent from '../../components/card-component/card-component';
import { OffersProps } from '../../types/offer';
import PlaceSortingComponent from './main-screen-components/place-sorting-component';
import LocationsTabList from './main-screen-components/locations-tab-list';

type MainScreenProps = {
  offersCount: number;
  offers: OffersProps[];
}

function MainScreen({offersCount, offers}: MainScreenProps): JSX.Element {

  return (
    <main className="page__main page__main--index">
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
              {offers.map((card) => (
                <CardComponent
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  type={card.type}
                  price={card.price}
                  isPremium={card.isPremium}
                  rating={card.rating}
                  previewImage={card.previewImage}
                  city={{
                    name: card.city.name,
                    location: {
                      latitude: card.location.latitude,
                      longitude: card.location.longitude,
                      zoom: card.location.zoom
                    }
                  }}
                  isFavorite={card.isFavorite}
                  location = {{
                    latitude: card.location.latitude,
                    longitude: card.location.longitude,
                    zoom: card.location.zoom
                  }}
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
  );
}

export default MainScreen;
