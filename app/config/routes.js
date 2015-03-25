import React from 'react';
import {Route} from 'react-router';

import App from '../views/App';

module.exports = (
  <Route handler={App}>

    <Route name="login"
      path="/login"
      handler={require('../views/Anonymous/views/LogIn/Handler')} />

    <Route name="logout"
      path="/logout"
      handler={require('../views/Anonymous/views/LogOut/Handler')} />

    <Route name="signedIn" handler={require('../views/SignedIn/Handler')}>

      <Route name="index"
        path="/"
        handler={require('../views/SignedIn/views/Index/Handler')} />

    </Route>

  </Route>
);

