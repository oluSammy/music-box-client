import React from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login/Login'));
const Genre = lazy(() => import('../pages/Genres/Genres'));
const SingleGenre = lazy(() => import('../pages/SingleGenre/SingleGenre'));
const SingleArtist = lazy(() => import('../pages/SIngleArtist/SIngleArtist'));
const ResetPassword = lazy(() => import('../pages/ResetPassword/ResetPassword'))
const SetNewPassword = lazy(() => import('../pages/SetNewPassword/SetNewPassword'))

const Routes = () => (
  <Switch>
    <Route
      path='/login'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      )}
    />
    <Route
      path='/genres'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <Genre />
        </Suspense>
      )}
    />
    <Route
      path='/genres/:genreId/:playlistId'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <SingleGenre />
        </Suspense>
      )}
    />
    <Route
      path='/artist/:id'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <SingleArtist />
        </Suspense>
      )}
    />
    <Route
      path='/reset-password'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPassword />
        </Suspense>
      )}
    />
    <Route
      path='/set-new-password'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <SetNewPassword />
        </Suspense>
      )}
    />
    <Redirect to='/' />
  </Switch>
);

export default Routes;
