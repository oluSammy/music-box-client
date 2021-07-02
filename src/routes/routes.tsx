import React from 'react';
// import { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import Social from '../pages/Social/Social'





const Routes = () => (
  <Switch>
    <Route exact path='/' component={LandingPage } />
    <Route exact path='/social/:token' component={Social} />
  
    <Redirect to='/' />
  </Switch>
);

export default Routes;
