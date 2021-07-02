import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SpinLoader from "../components/Loader/loder";
import AlbumPage from '../pages/AlbumPage/AlbumPage';
import PlaylistPage from '../pages/PlaylistPage/PlaylistPage';
import MyPlaylist from '../pages/MyPlaylistPage/MyPlaylist';
import Loader from '../components/Loader/Loader';
import LandingPage from '../pages/LandingPage/LandingPage';
import Social from '../pages/Social/Social';
import Library from './LibraryRoutes';

const UserProfile = lazy(() => import('../pages/UserProfile/UserProfile'));
const RecentlyPlayed = lazy(() => import('../pages/RecentlyPlayed/RecentlyPlayed'));

const Genre = lazy(() => import('../pages/Genres/Genres'));
const SingleGenre = lazy(() => import('../pages/SingleGenre/SingleGenre'));
const SingleArtist = lazy(() => import('../pages/SIngleArtist/SIngleArtist'));
const ResetPassword = lazy(() => import('../pages/ResetPassword/ResetPassword'))
const SetNewPassword = lazy(() => import('../pages/SetNewPassword/SetNewPassword'))
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ShowAllAlbum = lazy(() => import('../components/ShowAllCollection/ShowAllAlbum'));
const ShowAllArtist = lazy(() => import('../components/ShowAllCollection/ShowAllArtist'));
const ShowAllPlaylist = lazy(() => import('../components/ShowAllCollection/ShowAllPlaylist'));

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
      path='/genres'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <Genre />
        </Suspense>
      )}
      />
    <Route path='/album/:id' component={AlbumPage} />
    <Route path='/playlist/:id' component={PlaylistPage} />
    <Route path='/myPlaylist/:id' component={MyPlaylist} />
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
      path='/genres/:genreId/:playlistId'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <SingleGenre />
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
    <Route path='/library' exact render={() => <Redirect to='/library/playlist' />} />
    <Route
      path='/playlist/:id'
      exact
      render={() => (
        <div>
          <h3>Welcome to a playlist</h3>
        </div>
      )}
    />
    <Route
      path='/album/:id'
      exact
      render={() => (
        <div>
          <h3>Welcome to an Album</h3>
        </div>
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
      path='/library/:id'
      exact
      render={() => (
        <Suspense fallback={<div></div>}>
          <Library />
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
      path='/library'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <div>Hello</div>
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
