import React, { useContext, useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom';

const Social = () => {
  const { user } = useContext(AuthContext);
  const [newUser, setNewUser] = useState(user);

  const { token } = useParams<{ token: string }>();
  console.log(token);

  useEffect(() => {
    localStorage.setItem('musicApiUser', token);

    setNewUser(localStorage.getItem('musicApiUser'));
    console.log(newUser, '****');
  }, [newUser, token]);
  return <div>{newUser ? <Redirect to='/home' /> : <Loader />}</div>;
};

export default Social;
