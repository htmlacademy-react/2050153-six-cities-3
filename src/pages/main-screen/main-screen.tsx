import { useAppDispatch, useAppSelector } from '../../hooks';
import { chosenCity } from '../../store/action';
// import { OffersProps } from '../../types/offer';
import OffersList from './main-screen-components/offers-list';
import { cities } from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';

// type MainScreenProps = {
//   offers?: OffersProps[];
// }

function MainScreen(): JSX.Element {
  const currentCityName = useAppSelector((state) => state.city);
  const offersByCity = useAppSelector((state) => state.offersByCity);
  const dispatch = useAppDispatch();

  const mainCityClass: string = 'cities';
  const isEmpty = offersByCity === undefined;

  const handleClick = (city: string) => {
    dispatch(chosenCity(city));
  };

  if (isEmpty) {
    return (
      <NotFoundScreen />
    );
  }

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
            <OffersList currentCity={offersByCity[0].city} currentOffers={offersByCity} citiesClassName={mainCityClass} />
          ) : <p>There is no current offers for this city</p>}
      </div>
    </main>
  );
}

export default MainScreen;
