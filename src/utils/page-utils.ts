import { AppRoute, PageTitles } from '../const';
import { OffersProps } from '../types/offer';
import { ReviewsProps } from '../types/review';

export const getLayoutState = (pathname: AppRoute) =>{
  let rootClassName = '';
  let pageTitle = '';
  let linkClassName = '';
  let shouldRenderUser = true;
  let shouldRenderFooter = false;

  if (pathname === AppRoute.Main) {
    rootClassName = ' page--gray page--main';
    pageTitle = PageTitles.Main;
    linkClassName = ' header__logo-link--active';
  } else if (pathname === AppRoute.Login) {
    rootClassName = ' page--gray page--login';
    pageTitle = PageTitles.Login;
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    pageTitle = PageTitles.Favorites;
    shouldRenderFooter = true;
  } else if (pathname === AppRoute.Offer) {
    pageTitle = PageTitles.Offer;
  }

  return {rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter, pageTitle};
};

export const getCurrentSortedOffers = (offers: OffersProps[], sortOption: string) => {
  let sortedOffers = [...offers];
  switch (sortOption) {
    case 'Popular':
      sortedOffers = [...offers];
      break;
    case 'Price: low to high':
      sortedOffers = [...offers].sort((offer1: OffersProps , offer2: OffersProps) => offer1.price - offer2.price);
      break;
    case 'Price: high to low':
      sortedOffers = [...offers].sort((offer1: OffersProps , offer2: OffersProps) => offer1.price > offer2.price ? -1 : 1);
      break;
    case 'Top rated first':
      sortedOffers = [...offers].sort((offer1: OffersProps , offer2: OffersProps) => offer1.rating > offer2.rating ? -1 : 1);
      break;
  }
  return sortedOffers;
};

export const getSortedReviewsByDate = (reviews: ReviewsProps[]): ReviewsProps[] =>
  [...reviews].sort((review1, review2) => Date.parse(review2.date) - Date.parse(review1.date));
