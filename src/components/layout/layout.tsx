import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { getLayoutState } from '../../utils/page-utils';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';

function Layout(): JSX.Element {
  const {pathname} = useLocation();
  const {rootClassName, shouldRenderFooter, pageTitle} = getLayoutState(pathname as AppRoute);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className={`page${rootClassName}`}>
        <Header authorizationStatus={authorizationStatus}/>
        <Outlet />
        {shouldRenderFooter ? (
          <Footer />
        ) : null}
      </div>
    </>
  );
}

export default Layout;
