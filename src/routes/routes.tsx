import React, { lazy, Suspense, useContext } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import SpinLoader from '../components/Loader/loder';
import AlbumPage from '../pages/AlbumPage/AlbumPage';
import PlaylistPage from '../pages/PlaylistPage/PlaylistPage';
import MyPlaylist from '../pages/MyPlaylistPage/MyPlaylist';
// import Loader from '../components/Loader/Loader';
import Social from '../pages/Social/Social';
import Library from './LibraryRoutes';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { AuthContext } from '../context/AuthContext';
import { AnimatePresence } from 'framer-motion';

const LandingPage = lazy(() => import('../pages/LandingPage/LandingPage'));
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
const MostPopularPlaylists = lazy(() => import('../pages/PlaylistPage/MostPopularPlaylists'));

const Routes = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
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
          path='/allAlbum/:id'
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
          path='/playlists/mostPopular'
          exact
          render={() => (
            <Suspense fallback={<div></div>}>
              <MostPopularPlaylists />
            </Suspense>
          )}
        />
        <PrivateRoute
          path='/allArtist/:id'
          exact
          render={() => (
            <Suspense fallback={<div></div>}>
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
          path='/allPlaylist/:id'
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
            <Suspense fallback={<div></div>}>
              <HomePage />
            </Suspense>
          )}
        />
        <Route
          exact
          path='/'
          render={() =>
            user ? (
              <Redirect to='/home' />
            ) : (
              <Suspense
                fallback={
                  <div>
                    {' '}
                    <SpinLoader />{' '}
                  </div>
                }
              >
                <LandingPage />
              </Suspense>
            )
          }
        />
        <Route exact path='/social/:token' component={Social} />
        <Redirect to='/' />
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
<Suspense
  fallback={
    <div>
      {' '}
      <SpinLoader />{' '}
    </div>
  }
>
  <LandingPage />
</Suspense>;
