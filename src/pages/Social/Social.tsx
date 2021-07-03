import React, { useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { useParams, useHistory } from 'react-router-dom';

const Social = () => {
  const history = useHistory();

  const { token } = useParams<{ token: string }>();
  console.log(token);
  // localStorage.setItem('musicApiUser', JSON.stringify(token));

  useEffect(() => {
    if (token === 'facebookAcct') {
      alert('You already have an account with Facebook');
    } else if (token === 'googleAcct') {
      alert('You already have an account with Google');
    } else {
      history.push('/home');
      localStorage.setItem('musicApiUser', JSON.stringify(token));
    }
  }, [history, token]);
  return (
    <div>
      <Loader />
    </div>
  );
};

export default Social;
