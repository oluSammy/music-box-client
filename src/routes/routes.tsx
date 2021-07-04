import React, { lazy, Suspense, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SpinLoader from '../components/Loader/loder';
import AlbumPage from '../pages/AlbumPage/AlbumPage';
import PlaylistPage from '../pages/PlaylistPage/PlaylistPage';
import MyPlaylist from '../pages/MyPlaylistPage/MyPlaylist';
import Loader from '../components/Loader/Loader';
import LandingPage from '../pages/LandingPage/LandingPage';
import Social from '../pages/Social/Social';
import Library from './LibraryRoutes';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { AuthContext } from '../context/AuthContext';

const UserProfile = lazy(() => import('../pages/UserProfile/UserProfile'));
const RecentlyPlayed = lazy(() => import('../pages/RecentlyPlayed/RecentlyPlayed'));

const Genre = lazy(() => import('../pages/Genres/Genres'));
const SingleGenre = lazy(() => import('../pages/SingleGenre/SingleGenre'));
const SingleArtist = lazy(() => import('../pages/SIngleArtist/SIngleArtist'));
const ResetPassword = lazy(() => import('../pages/ResetPassword/ResetPassword'));
const SetNewPassword = lazy(() => import('../pages/SetNewPassword/SetNewPassword'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ShowAllAlbum = lazy(() => import('../components/ShowAllCollection/ShowAllAlbum'));
const ShowAllArtist = lazy(() => import('../components/ShowAllCollection/ShowAllArtist'));
const ShowAllPlaylist = lazy(() => import('../components/ShowAllCollection/ShowAllPlaylist'));

const Routes = () => {
  const { user } = useContext(AuthContext);
  return (
    <Switch>
      <PrivateRoute
        path='/recently-played'
        exact
        render={() => (
          <Suspense
            fallback={
              <div>
                {' '}
                <SpinLoader />{' '}
              </div>
            }
          >
            <RecentlyPlayed />
          </Suspense>
        )}
      />
      <PrivateRoute
        path='/user-profile'
        exact
        render={() => (
          <Suspense
            fallback={
              <div>
                {' '}
                <SpinLoader />{' '}
              </div>
            }
          >
            <UserProfile />
          </Suspense>
        )}
      />
      <PrivateRoute
        path='/allAlbum'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <ShowAllAlbum />
          </Suspense>
        )}
      />
      <PrivateRoute
        path='/genres'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <Genre />
          </Suspense>
        )}
      />
      <PrivateRoute path='/album/:id' component={AlbumPage} />
      <PrivateRoute path='/playlist/:id' component={PlaylistPage} />
      <PrivateRoute path='/myPlaylist/:id' component={MyPlaylist} />
      <PrivateRoute
        path='/allArtist'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <ShowAllArtist />
          </Suspense>
        )}
      />
      <PrivateRoute
        path='/genres/:genreId/:playlistId'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <SingleGenre />
          </Suspense>
        )}
      />
      <PrivateRoute
        path='/allPlaylist'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <ShowAllPlaylist />
          </Suspense>
        )}
      />
      <PrivateRoute path='/library' exact render={() => <Redirect to='/library/playlist' />} />
      <PrivateRoute
        path='/playlist/:id'
        exact
        render={() => (
          <div>
            <h3>Welcome to a playlist</h3>
          </div>
        )}
      />
      <PrivateRoute
        path='/album/:id'
        exact
        render={() => (
          <div>
            <h3>Welcome to an Album</h3>
          </div>
        )}
      />
      <PrivateRoute
        path='/artist/:id'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <SingleArtist />
          </Suspense>
        )}
      />
      <PrivateRoute
        path='/library/:id'
        exact
        render={() => (
          <Suspense fallback={<div></div>}>
            <Library />
          </Suspense>
        )}
      />
      <PrivateRoute
        path='/reset-password'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
          </Suspense>
        )}
      />
      <PrivateRoute
        path='/library'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <div>Hello</div>
          </Suspense>
        )}
      />
      <PrivateRoute
        path='/set-new-password'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <SetNewPassword />
          </Suspense>
        )}
      />
      <PrivateRoute
        path='/browse'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <div>Hello</div>
          </Suspense>
        )}
      />
      <PrivateRoute
        path='/home'
        exact
        render={() => (
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        )}
      />
      <Route exact path='/' render={() => (user ? <Redirect to='/home' /> : <LandingPage />)} />
      <Route exact path='/social/:token' component={Social} />
      <Redirect to='/' />
    </Switch>
  );
};

export default Routes;
