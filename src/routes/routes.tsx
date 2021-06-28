import React from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login/Login'));
const Library = lazy(() => import('./LibraryRoutes'));

const Routes = () => (
  <Switch>
    <Route
      path='/login'
      exact
      render={() => (
        <Suspense fallback={<div></div>}>
          <Login />
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
        <div>
          <h3>Welcome to an Artist</h3>
        </div>
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
    <Redirect to='/' />
  </Switch>
);

export default Routes;
