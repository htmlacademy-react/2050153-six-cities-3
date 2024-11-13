import { useState } from 'react';
import { OffersProps } from '../../types/offer';
import OffersList from './main-screen-components/offers-list';
import { Cities } from '../../const';
import { getCurrentOffers } from '../../utils/page-utils';

type MainScreenProps = {
  offers: OffersProps[];
}

function MainScreen({offers}: MainScreenProps): JSX.Element {
  const [currentCityName, setCurrentCityName] = useState<string>('Amsterdam');
  const mainCityClass: string = 'cities';

  const currentOffers = getCurrentOffers(offers, currentCityName);

  const handleClick = (city: string) => {
    setCurrentCityName(city);
  };

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
      <div className={mainCityClass}>
        {(currentOffers !== null) ?
          (
            <OffersList currentCity={currentOffers[0].city} currentOffers={currentOffers} citiesClassName={mainCityClass} />
          ) : <p>There is no current offers for this city</p>}
      </div>
    </main>
  );
}

export default MainScreen;
