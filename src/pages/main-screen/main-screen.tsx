import { useEffect, useState } from 'react';
import CardComponent from '../../components/card-component/card-component';
import { CardProps, OffersProps } from '../../types/offer';
import PlaceSortingComponent from './main-screen-components/place-sorting-component';
import LocationsTabList from './main-screen-components/locations-tab-list';

type MainScreenProps = {
  offersCount: number;
  offers: OffersProps[];
}

function MainScreen({offersCount, offers}: MainScreenProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<CardProps>();
  const handleHover = (offer?: CardProps) => {
    setActiveOffer(offer);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(activeOffer);
  });

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
              {offers.map((offer: CardProps) => (
                <CardComponent
                  key={offer.id}
                  offer={offer}
                  handleHover={handleHover}
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
