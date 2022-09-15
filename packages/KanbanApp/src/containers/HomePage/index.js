import Loadable from 'components/Loadable';
import { Loading } from 'components/Loading';
import { lazy } from 'react';

const LazyHome = lazy(() => import('./HomePage'));

const HomePage = (props) => (
  <Loadable fallback={<Loading fullHeight />}>
    <LazyHome {...props} />
  </Loadable>
);

export { HomePage };
