import React from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login/Login'));
const Genre = lazy(() => import('../pages/Genres/Genres'));
const SingleGenre = lazy(() => import('../pages/SingleGenre/SingleGenre'));
const SingleArtist = lazy(() => import('../pages/SIngleArtist/SIngleArtist'));

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
      path='/artist/:_id'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <SingleArtist />
        </Suspense>
      )}
    />
    <Redirect to='/' />
  </Switch>
);

export default Routes;
