import { lazy } from 'react';
import Loadable from 'components/Loadable';

const LazyLogin = lazy(() => import('./LoginPage'));

const LoginPage = (props) => (
  <Loadable>
    <LazyLogin {...props} />
  </Loadable>
);

export { LoginPage };
