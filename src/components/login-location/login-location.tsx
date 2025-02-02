import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { memo } from 'react';


function LoginLocation(): JSX.Element {
  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={`${AppRoute.Main}`}>
          <span>Amsterdam</span>
        </Link>
      </div>
    </section>
  );
}

const MemoizedLoginLocation = memo(LoginLocation);

export default MemoizedLoginLocation;
