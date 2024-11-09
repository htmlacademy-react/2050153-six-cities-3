import { AppRoute, PageTitle, AuthorizationStatus } from '../const';

export const getAuthorizationStatus = () => AuthorizationStatus.NoAuth;

export const getLayoutState = (pathname: AppRoute) =>{
  let rootClassName = '';
  let pageTitle = '';
  let linkClassName = '';
  let mapClassName = '';
  let shouldRenderUser = true;
  let shouldRenderFooter = false;

  if (pathname === AppRoute.Main) {
    rootClassName = ' page--gray page--main';
    pageTitle = PageTitle.Main;
    linkClassName = ' header__logo-link--active';
    mapClassName = 'cities';
  } else if (pathname === AppRoute.Login) {
    rootClassName = ' page--gray page--login';
    pageTitle = PageTitle.Login;
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    pageTitle = PageTitle.Favorites;
    shouldRenderFooter = true;
  } else if (pathname === AppRoute.Offer) {
    pageTitle = PageTitle.Offer;
    mapClassName = 'offer';
  }

  return {rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter, pageTitle, mapClassName};
};

export const getCardFeatures = (pathname: AppRoute) =>{
  let cardClassName = '';
  let cardInfoClassName = '';

  if (pathname === AppRoute.Main) {
    cardClassName = 'cities';
  } else if (pathname === AppRoute.Favorites) {
    cardClassName = 'favorites';
    cardInfoClassName = 'favorites__card-info';
  } else if (pathname === AppRoute.Offer) {
    cardClassName = 'near-places';
  }

  return {cardClassName, cardInfoClassName};
};
