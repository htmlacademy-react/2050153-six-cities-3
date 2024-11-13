import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <main className="page__main page__main--not-found">
      <h1>404. Page not found</h1>
      <Link to={`${AppRoute.Main}`}>
        Вернуться на главную:
        <br></br>
        <img src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
      </Link>
    </main>
  );
}

export default NotFoundScreen;
