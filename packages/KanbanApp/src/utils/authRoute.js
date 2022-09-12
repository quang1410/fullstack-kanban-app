import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { APP_ROUTES } from './constants';

const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = true;

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to={APP_ROUTES.LOGIN} />
        );
      }}
    />
  );
};

export default AuthRoute;
