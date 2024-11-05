import { AppRoute, PageTitle, AuthorizationStatus } from '../const';

// Приобразование формата отображения текста с первой заглавной буквой.
// Пример: "Название Города"
// export const CapitalizeWords = (str: string): string => str.replace(/\b\w/g, (c) => (c).toUpperCase());

export const getAuthorizationStatus = () => AuthorizationStatus.NoAuth;

export const getLayoutState = (pathname: AppRoute) =>{
  let rootClassName = '';
  let pageTitle = '';
  let linkClassName = '';
  let shouldRenderUser = true;
  let shouldRenderFooter = false;

  if (pathname === AppRoute.Main) {
    rootClassName = ' page--gray page--main';
    pageTitle = PageTitle.Main;
    linkClassName = ' header__logo-link--active';
  } else if (pathname === AppRoute.Login) {
    rootClassName = ' page--gray page--login';
    pageTitle = PageTitle.Login;
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    pageTitle = PageTitle.Favorites;
    shouldRenderFooter = true;
  } else if (pathname === AppRoute.Offer) {
    pageTitle = PageTitle.Offer;
  } else {
    shouldRenderUser = false;
    pageTitle = PageTitle.NotFound;
    shouldRenderFooter = true;
  }

  return {rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter, pageTitle};
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

export const getMapFeatures = (pathname: AppRoute) =>{
  let mapClassName = '';

  if (pathname === AppRoute.Main) {
    mapClassName = 'cities';
  } else if (pathname === AppRoute.Offer) {
    mapClassName = 'offer';
  }

  return {mapClassName};
};
