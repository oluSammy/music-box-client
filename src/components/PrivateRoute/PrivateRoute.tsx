import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { checkIsLoggedIn } from '../../utils/checkIsLoggedIn';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ ...rest }) => {
  const { setUser } = useContext(AuthContext);
  const [logout, setLogOut] = useState(true);
  useEffect(() => {
    const checkLogout = checkIsLoggedIn();
    setLogOut(checkLogout);
    if (!checkLogout) {
      setUser(null);
    }
  }, [setUser]);
  return <>{!logout ? <Redirect to='/' /> : <Route {...rest} />}</>;
};

export default PrivateRoute;
