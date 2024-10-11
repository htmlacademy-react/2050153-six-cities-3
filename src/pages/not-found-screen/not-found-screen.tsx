import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import {PageTitle} from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{PageTitle.NotFound}</title>
      </Helmet>
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
