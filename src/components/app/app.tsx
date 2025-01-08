import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { useAppSelector } from '../../hooks';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const offers = useAppSelector((state) => state.offers);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Layout/>}
          >
            <Route
              index
              element={<MainScreen authorizationStatus={authorizationStatus} />}
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus} isReverse>
                  <LoginScreen />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavoritesScreen offers={offers} />
                </PrivateRoute>
              }
            />
            <Route
              path={`${AppRoute.Offer}/:id`}
              element={<OfferScreen authorizationStatus={authorizationStatus}/>}
            />
            <Route
              path='*'
              element={<NotFoundScreen />}
            />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
