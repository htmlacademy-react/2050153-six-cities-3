import { useAppDispatch, useAppSelector } from '../../hooks';
import { chosenCity } from '../../store/action';
import { OffersProps } from '../../types/offer';
import OffersList from './main-screen-components/offers-list';
import { cities } from '../../mocks/city-locations';

type MainScreenProps = {
  offers: OffersProps[];
}

function MainScreen({offers}: MainScreenProps): JSX.Element {
  const currentCityName = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const mainCityClass: string = 'cities';

  const handleClick = (city: string) => {
    dispatch(chosenCity(city));
  };

  const currentOffers = offers.filter((offer) => offer.city.name === currentCityName);

  const isEmpty = currentOffers.length === 0;

  return (
    <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => (
              <li className="locations__item" key={city.name}>
                <a
                  className={`locations__item-link tabs__item ${currentCityName === city.name ? 'tabs__item--active' : ''}`}
                  onClick={(evt) => {
                    evt.preventDefault();
                    handleClick(city.name);
                  }}
                  href={`#${city.name}`}
                >
                  <span>{city.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className={mainCityClass}>
        {!isEmpty ?
          (
            <OffersList currentCity={currentOffers[0].city} currentOffers={currentOffers} citiesClassName={mainCityClass} />
          ) : <p>There is no current offers for this city</p>}
      </div>
    </main>
  );
}

export default MainScreen;
