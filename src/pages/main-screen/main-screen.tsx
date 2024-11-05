import { useState } from 'react';
import { CardProps, CityProps } from '../../types/offer';
import OffersListComponent from './main-screen-components/offers-list-component';
import { Cities } from '../../const';

type MainScreenProps = {
  offersCount: number;
  offers: CardProps[];
}

function MainScreen({offersCount, offers}: MainScreenProps): JSX.Element {
  const [currentCityName, setCurrentCityName] = useState<string | null>(null);

  const getCurrentOffers = (): CardProps[] | null => {
    const currentOffers: CardProps[] | null = [];

    offers.forEach((offer) => {
      if (offer.city.name === currentCityName) {
        currentOffers.push(offer);
      }
    });

    if (currentOffers !== null) {
      return currentOffers.splice(offersCount);
    }
    return null;
  };

  const currentOffers = getCurrentOffers();
  const currentCity: CityProps | null = (currentOffers !== null) ? currentOffers[0].city : null;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Cities.map((city: string) => (
              <li className="locations__item" key={city}>
                <a
                  className="locations__item-link tabs__item"
                  href={`#${city}`}
                  onClick={() => setCurrentCityName(city)}
                >
                  <span>{city}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        {(currentOffers !== null && currentCity !== null) ?
          (
            <OffersListComponent currentCity={currentCity} currentOffers={currentOffers} />
          ) : null}
      </div>
    </main>
  );
}

export default MainScreen;
