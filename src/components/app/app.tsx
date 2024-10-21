import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute} from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';
import {offers} from '../../mocks/offers';
import Layout from '../layout/layout';
import {getAuthorizationStatus} from '../../utils';

type AppScreenProps = {
  offersCount: number;
};

function App({offersCount}: AppScreenProps): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Layout/>}
          >
            <Route
              index
              element={<MainScreen offersCount={offersCount}/>}
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
                  <FavoritesScreen />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={<OfferScreen offerId={offers[0].id}/>}
            />
            <Route
              path="*"
              element={<NotFoundScreen />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
