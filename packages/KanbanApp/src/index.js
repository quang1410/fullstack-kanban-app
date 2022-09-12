import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Router>
  </Provider>,
);
