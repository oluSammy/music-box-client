import React from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SpinLoader from "../components/Loader/loder";

const Login = lazy(() => import('../pages/Login/Login'));
const UserProfile = lazy(() => import('../pages/UserProfile/UserProfile'));
const RecentlyPlayed = lazy(() => import('../pages/RecentlyPlayed/RecentlyPlayed'));

const Routes = () => (
  <Switch>
    <Route
      path='/recently-played'
      exact
      render={() => (
        <Suspense fallback={<div> <SpinLoader /> </div>}>
          <RecentlyPlayed />
        </Suspense>
      )}
    />
    <Route
      path='/user-profile'
      exact
      render={() => (
        <Suspense fallback={<div> <SpinLoader /> </div>}>
          <UserProfile />
        </Suspense>
      )}
    />
    <Redirect to='/' />
    <Route
      path='/login'
      exact
      render={() => (
        <Suspense fallback={<div> <SpinLoader /> </div>}>
          <Login />
        </Suspense>
      )}
    />
    <Redirect to='/' />
  </Switch>
);

export default Routes;
