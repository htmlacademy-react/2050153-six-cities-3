import {Outlet, useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../const';
import {getLayoutState} from '../../utils/pageUtils';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';


function Layout(): JSX.Element {
  const pathname = useLocation();
  const {rootClassName, shouldRenderFooter, pageTitle} = getLayoutState(pathname as unknown as AppRoute);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className={`page${rootClassName}`}>
        <Header />
        <Outlet />
        {shouldRenderFooter ? (
          <Footer />
        ) : null}
      </div>
    </>
  );
}

export default Layout;
