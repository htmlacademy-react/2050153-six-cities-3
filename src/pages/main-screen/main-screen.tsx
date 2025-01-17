import { useAppDispatch, useAppSelector } from '../../hooks';
import { chosenCity } from '../../store/offers-process/offers-process';
import OffersList from './main-screen-components/offers-list';
import { AuthorizationStatus, cities } from '../../const';
import { getCity, getOffersByCity } from '../../store/offers-process/selectors';
import { OffersProps } from '../../types/offer';

type MainScreenProps = {
  authorizationStatus: AuthorizationStatus;
  offers: OffersProps[];
}

function MainScreen({authorizationStatus, offers}: MainScreenProps): JSX.Element {
  const currentCityName = useAppSelector(getCity);
  const offersByCity = useAppSelector(getOffersByCity);
  const dispatch = useAppDispatch();

  const mainCityClass: string = 'cities';
  const isEmpty = offersByCity === undefined;

  const handleClick = (city: string) => {
    if (currentCityName !== city) {
      dispatch(chosenCity({city: city, offers: offers}));
    }
  };

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
            <OffersList currentCity={offersByCity[0].city} citiesClassName={mainCityClass} authorizationStatus={authorizationStatus} />
          ) : <p>There is no current offers for this city</p>}
      </div>
    </main>
  );
}

export default MainScreen;
