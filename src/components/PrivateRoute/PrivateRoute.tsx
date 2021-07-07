import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
import { checkIsLoggedIn } from '../../utils/checkIsLoggedIn';

const PrivateRoute = ({ ...rest }) => {
  return <>{!checkIsLoggedIn() ? <Redirect to='/' /> : <Route {...rest} />}</>;
};

export default PrivateRoute;
