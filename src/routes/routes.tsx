import React from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Social from '../pages/Social/Social'


const LandingPage = lazy(() => import('../pages/LandingPage/LandingPage'));
// const Social = lazy(() => import('../pages/Social/Social'));



const Routes = () => (
  <Switch>
    <Route exact
      path='/'
      render={() => (
        <Suspense fallback={<Loader />}>
          <LandingPage />
        </Suspense>
      )}
    />
    <Route exact
      path='/social/:token' component={Social}
    />

    <Redirect to='/' />
  </Switch>
);

export default Routes;
