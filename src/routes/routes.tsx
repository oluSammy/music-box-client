import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

const Routes = () => (
  <Switch>
    <Redirect to='/' />
  </Switch>
);

export default Routes;
