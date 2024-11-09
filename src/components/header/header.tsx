import {Link, useLocation} from 'react-router-dom';
import { getAuthorizationStatus, getLayoutState } from '../../utils/pageUtils';
import { AppRoute, AuthorizationStatus } from '../../const';

function Header(): JSX.Element {
  const pathname = useLocation();
  const linkClassName = ' header__logo-link--active';
  const {shouldRenderUser} = getLayoutState(pathname as unknown as AppRoute);
  const authorizationStatus = getAuthorizationStatus();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={`header__logo-link ${pathname === AppRoute.Main ? linkClassName : ''}`} to={`${AppRoute.Main}`}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {shouldRenderUser ? (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  {
                    authorizationStatus === AuthorizationStatus.Auth ? (
                      <Link className="header__nav-link header__nav-link--profile" to={`${AppRoute.Favorites}`}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                        <span className="header__favorite-count">3</span>
                      </Link>
                    ) : (
                      <Link className="header__nav-link header__nav-link--profile" to={`${AppRoute.Login}`}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header_login">Sign in</span>
                      </Link>
                    )
                  }
                </li>
                <li className="header__nav-item">
                  {
                    authorizationStatus === AuthorizationStatus.Auth ? (
                      <Link className="header__nav-link" to={`${AppRoute.Main}`}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                    ) : null
                  }
                </li>
              </ul>
            </nav>) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
