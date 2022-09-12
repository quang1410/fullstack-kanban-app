import { init } from '@rematch/core';
import { createBrowserHistory } from 'history';
import createLoadingPlugin from '@rematch/loading';
import selectPlugin from '@rematch/select';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import * as models from './models';

export const history = createBrowserHistory();
const reducers = { router: connectRouter(history) };

const loading = createLoadingPlugin();

const store = init({
  redux: {
    reducers,
    middlewares: [routerMiddleware(history)],
    devtoolOptions: {
      disabled: process.env.NODE_ENV === 'production',
    },
  },
  plugins: [loading, selectPlugin()],
  models,
});

export default store;
