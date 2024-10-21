import { AppRoute, PageTitle, AuthorizationStatus } from '../const';

// Приобразование формата отображения текста с первой заглавной буквой.
// Пример: "Название Города"
// export const CapitalizeWords = (str: string): string => str.replace(/\b\w/g, (c) => (c).toUpperCase());

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
  }

  return {rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter, pageTitle};
};

export const getAuthorizationStatus = () => AuthorizationStatus.NoAuth;
