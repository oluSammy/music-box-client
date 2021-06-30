import React from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AlbumPage from '../pages/AlbumPage/AlbumPage';
import PlaylistPage from '../pages/PlaylistPage/PlaylistPage';
import MyPlaylist from '../pages/MyPlaylistPage/MyPlaylist';

const Login = lazy(() => import('../pages/Login/Login'));

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
    <Route path="/album/:id" component= {AlbumPage} />
    <Route path="/playlist/:id" component= {PlaylistPage} />
    <Route path="/myPlaylist/:id" component= {MyPlaylist} />
    <Redirect to='/' />
  </Switch>
);

export default Routes;
