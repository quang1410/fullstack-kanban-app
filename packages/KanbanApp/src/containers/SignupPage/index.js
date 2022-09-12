import { lazy } from 'react';
import Loadable from 'components/Loadable';

const LazySignup = lazy(() => import('./SignupPage'));

const SignupPage = (props) => (
  <Loadable>
    <LazySignup {...props} />
  </Loadable>
);

export { SignupPage };
