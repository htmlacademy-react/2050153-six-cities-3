import {Link} from 'react-router-dom';
import {Cities} from '../../../const';

function LocationsTabList(): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Cities.map((city: string) => (
          <li className="locations__item" key={city}>
            <Link className="locations__item-link tabs__item" to="#todo">
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LocationsTabList;
