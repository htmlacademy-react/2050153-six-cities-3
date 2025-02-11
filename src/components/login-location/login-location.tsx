import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { getCity } from '../../store/offers/selectors';


function LoginLocation(): JSX.Element {
  const chosenCity = useAppSelector(getCity);

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={`${AppRoute.Main}`}>
          <span>{chosenCity}</span>
        </Link>
      </div>
    </section>
  );
}

const MemoizedLoginLocation = memo(LoginLocation);

export default MemoizedLoginLocation;
