import { AppRoute, PageTitle, AuthorizationStatus } from '../const';
import { OffersProps } from '../types/offer';

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
  }

  return {rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter, pageTitle};
};

export const getCurrentOffers = (offers: OffersProps[], currentCityName: string): OffersProps[] | null => {
  const currentOffers: OffersProps[] = [];

  offers.forEach((offer) => {
    if (offer.city.name === currentCityName) {
      currentOffers.push(offer);
    }
  });

  return currentOffers;
};

export const getNearOffers = (offers: OffersProps[], currentOffer: OffersProps) : OffersProps[] | null => {
  const currentOffers: OffersProps[] | null = [];

  offers.map((offer) => {
    if (
      currentOffer.city.name === offer.city.name
      && currentOffer.id !== offer.id
    ) {
      currentOffers.push(offer);
    }
  });

  if (currentOffers) {
    return currentOffers.slice(0, 3);
  }
  return null;
};
