import React, { useState, useEffect, useContext } from 'react';
import Loader from '../../components/Loader/Loader';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom';
import { setTokenExpiryDate } from '../../utils/tokenExpiryDate';

const Social = () => {
  const [message, setMessage] = useState('loading');
  const [user, setUser] = useState<null | string>(null);
  const history = useHistory();
  const { setLoginMessage, setUser: setNewUser } = useContext(AuthContext);

  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    if (token === 'facebookAcct') {
      setLoginMessage('You already have an account created with facebook, please login with facebook');
      setMessage('facebookAcct');
    } else if (token === 'localeAcct') {
      setLoginMessage('You already have an account created with this email, please login with email and password');
      setMessage('localeAcct');
    } else if (token === 'googleAcct') {
      setLoginMessage('You already have an account created with google, please login with google');
      setMessage('googleAcct');
    } else {
      const loggedUser = { ...JSON.parse(token), expiryDate: setTokenExpiryDate() };
      localStorage.setItem('musicApiUser', JSON.stringify(loggedUser));
      localStorage.setItem('prevRoute', 'login');
      setUser(token);
      setNewUser(JSON.parse(token));
      setMessage('user');
    }
  }, [token, history, message, setLoginMessage, user, setNewUser]);

  return (
    <div>
      {message !== 'user' && message !== 'loading' ? (
        <Redirect to='/' />
      ) : user ? (
        <Redirect
          to={{
            pathname: '/home',
            state: { from: 'login' },
          }}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Social;
