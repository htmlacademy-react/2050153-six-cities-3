import {Link} from 'react-router-dom';
import Header from '../../components/header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Header />

      <main className="page__main page__main--not-found">
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </main>
    </>
  );
}

export default NotFoundScreen;
