import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import LandingPage from '../pages/LandingPage/LandingPage';
import Social from '../pages/Social/Social';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ShowAllAlbum = lazy(() => import('../components/ShowAllCollection/ShowAllAlbum'));
const ShowAllArtist = lazy(() => import('../components/ShowAllCollection/ShowAllArtist'));
const ShowAllPlaylist = lazy(() => import('../components/ShowAllCollection/ShowAllPlaylist'));

const Routes = () => (
  <Switch>
    <Route
      path='/allAlbum'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <ShowAllAlbum />
        </Suspense>
      )}
    />
    <Route
      path='/allArtist'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <ShowAllArtist />
        </Suspense>
      )}
    />
    <Route
      path='/allPlaylist'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <ShowAllPlaylist />
        </Suspense>
      )}
    />
    <Route
      path='/library'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <div>Hello</div>
        </Suspense>
      )}
    />
    <Route
      path='/browse'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <div>Hello</div>
        </Suspense>
      )}
    />
    <Route
      path='/home'
      exact
      render={() => (
        <Suspense fallback={<Loader />}>
          <HomePage />
        </Suspense>
      )}
    />
    <Route exact path='/' component={LandingPage} />
    <Route exact path='/social/:token' component={Social} />
    <Redirect to='/' />
  </Switch>
);

export default Routes;
