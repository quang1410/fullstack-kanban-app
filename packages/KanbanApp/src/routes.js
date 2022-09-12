import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  LoginPage,
  NotFoundPage,
  AboutPage,
  HomePage,
  SignupPage,
} from './containers';

import { AuthRoute } from 'utils';
import { APP_ROUTES } from 'utils/constants';

function Routers() {
  return (
    <Switch>
      <AuthRoute exact path={APP_ROUTES.ABOUT} component={AboutPage} />
      <Route exact path={APP_ROUTES.LOGIN} component={LoginPage} />
      <Route exact path={APP_ROUTES.SINGUP} component={SignupPage} />
      <AuthRoute exact path={APP_ROUTES.HOME} component={HomePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}
export default Routers;
