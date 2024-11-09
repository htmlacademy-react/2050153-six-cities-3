import { useState } from 'react';
import { OffersProps } from '../../types/offer';
import OffersListComponent from './main-screen-components/offers-list-component';
import { Cities } from '../../const';

type MainScreenProps = {
  offers: OffersProps[];
}

function MainScreen({offers}: MainScreenProps): JSX.Element {
  const [currentCityName, setCurrentCityName] = useState<string>('Amsterdam');
  // const [active, setActive] = useState(false);

  const getCurrentOffers = (): OffersProps[] | null => {
    const currentOffers: OffersProps[] | null = [];

    offers.forEach((offer) => {
      if (offer.city.name === currentCityName) {
        currentOffers.push(offer);
      }
    });

    if (currentOffers !== null) {
      return currentOffers;
    }
    return null;
  };

  const currentOffers = getCurrentOffers();

  const handleClick = (city: string) => {
    setCurrentCityName(city);
    // setActive(!active);
  };
  // const currentCity: CityProps | null = (currentOffers !== null) ? currentOffers[0].city : null;
  // const currentCity: CityProps = (currentOffers !== null) ? currentOffers[0].city : null;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Cities.map((city: string) => (
              <li className="locations__item" key={city}>
                <a
                  className={'locations__item-link tabs__item'}
                  href={`#${city}`}
                  onClick={() => handleClick(city)}
                >
                  <span>{city}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        {(currentOffers !== null) ?
          (
            <OffersListComponent currentCity={currentOffers[0].city} currentOffers={currentOffers} />
          ) : <p>Нет тякущих предложений для этого города</p>}
      </div>
    </main>
  );
}

export default MainScreen;
