import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { getLayoutState } from '../../utils/page-utils';
import MemoizedHeader from '../../components/header/header';
import MemoizedFooter from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import { getAuthCheckedStatus } from '../../store/user-process/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function Layout(): JSX.Element {
  const {pathname} = useLocation();
  const {rootClassName, shouldRenderFooter, pageTitle} = getLayoutState(pathname as AppRoute);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  if (!isAuthChecked) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className={`page${rootClassName}`}>
        <MemoizedHeader />
        <Outlet />
        {shouldRenderFooter ? (
          <MemoizedFooter />
        ) : null}
      </div>
    </>
  );
}

export default Layout;
