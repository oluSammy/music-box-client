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
    <Route path='/playlist/:id' exact render={() => <div>Hello</div>} />
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
