import Loadable from 'components/Loadable';
import { ThreeDotsLoader } from 'components/ThreeDotsLoader';
import { lazy } from 'react';
import { colors } from 'styles/theme';

const LazyHome = lazy(() => import('./HomePage'));

const HomePage = (props) => (
  <Loadable fallback={<ThreeDotsLoader color={colors.electricViolet} />}>
    <LazyHome {...props} />
  </Loadable>
);

export { HomePage };
