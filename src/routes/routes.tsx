import React from 'react';
// import { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import Login from '../pages/Login/Login';
// import Loader from '../components/Loader/Loader';
import Social from '../pages/Social/Social'


// const LandingPage = lazy(() => import('../pages/LandingPage/LandingPage'));



const Routes = () => (
  <Switch>
    <Route exact path='/' component={LandingPage } />
    <Route exact path='/social/:token' component={Social} />
    <Route exact path='/login' component={Login} />
  
    <Redirect to='/' />
  </Switch>
);

export default Routes;
