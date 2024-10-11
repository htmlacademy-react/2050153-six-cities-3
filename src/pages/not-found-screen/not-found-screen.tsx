import {Link} from 'react-router-dom';
import Header from '../../components/header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Header />

      <main className="page__main page__main--not-found">
        <h1>404. Page not found</h1>
        <Link to="/">
          Вернуться на главную:
          <img src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
        </Link>
      </main>
    </>
  );
}

export default NotFoundScreen;
