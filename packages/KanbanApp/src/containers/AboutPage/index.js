import Loadable from 'components/Loadable';
import { lazy } from 'react';

const LazyAbout = lazy(() => import('./AboutPage'));

const AboutPage = (props) => (
  <Loadable>
    <LazyAbout {...props} />
  </Loadable>
);

export { AboutPage };
