import { Link, useLocation } from 'react-router-dom';
import { getLayoutState } from '../../utils/page-utils';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { memo } from 'react';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { getUser, getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/selectors';
import { getFavoriteOffers } from '../../store/favorite-offers/selectors';
import { resetFavoriteOffers } from '../../store/favorite-offers/favorite-offers';
import { resetOffersFavorite } from '../../store/offers/offers';
import { resetCurrentOffer } from '../../store/current-offer/current-offer';

function Header(): JSX.Element {
  const {pathname} = useLocation();
  const {linkClassName, shouldRenderUser} = getLayoutState(pathname as AppRoute);
  const dispatch = useAppDispatch();

  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favouriteOffers = useAppSelector(getFavoriteOffers);

  if (!isAuthChecked) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={`header__logo-link ${linkClassName}`}
              to={`${AppRoute.Main}`}
            >
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
                          <img src={`${user?.avatarUrl}`} alt="user-avatar" width="20" height="20" />
                        </div>
                        <span className="header__user-name user__name">{`${user?.email}`}</span>
                        <span className="header__favorite-count">{`${favouriteOffers.length}`}</span>
                      </Link>
                    ) : (
                      <Link className="header__nav-link header__nav-link--profile" to={`${AppRoute.Login}`}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    )
                  }
                </li>
                <li className="header__nav-item">
                  {
                    authorizationStatus === AuthorizationStatus.Auth ? (
                      <Link
                        className="header__nav-link"
                        onClick={(evt) => {
                          evt.preventDefault();
                          dispatch(logoutAction());
                          dispatch(resetFavoriteOffers());
                          dispatch(resetOffersFavorite());
                          dispatch(resetCurrentOffer());
                        }}
                        to={`${AppRoute.Main}`}
                      >
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

const MemoizedHeader = memo(Header);

export default MemoizedHeader;
