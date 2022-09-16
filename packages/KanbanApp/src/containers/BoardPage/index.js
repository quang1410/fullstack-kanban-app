import Loadable from 'components/Loadable';
import { lazy } from 'react';

const LazyAbout = lazy(() => import('./BoardPage'));

const BoardPage = (props) => (
  <Loadable>
    <LazyAbout {...props} />
  </Loadable>
);

export { BoardPage };
