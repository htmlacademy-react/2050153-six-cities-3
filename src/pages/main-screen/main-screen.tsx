import { useAppDispatch, useAppSelector } from '../../hooks';
import { chosenCity } from '../../store/offers/offers';
import MemoizedOffersList from './main-screen-components/offers-list';
import { AuthorizationStatus, cities } from '../../const';
import { getCity, getOffersByCity } from '../../store/offers/selectors';
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
  const isEmpty = offersByCity === undefined || offersByCity.length === 0;

  const handleClick = (city: string) => {
    if (currentCityName !== city) {
      dispatch(chosenCity({city: city, allOffers: offers}));
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
          <MemoizedOffersList currentCity={offersByCity[0].city} citiesClassName={mainCityClass} authorizationStatus={authorizationStatus} />
          :
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {currentCityName}</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>}
      </div>
    </main>
  );
}

export default MainScreen;
