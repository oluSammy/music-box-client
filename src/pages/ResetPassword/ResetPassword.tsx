import React, { useState, MouseEvent } from 'react';
import resetPasswordStyles from './ResetPassword.module.css';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Alerts from '../../ui/Alert/Alert';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
import { BASE_URL } from '../../constants';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState('success');
  const [alertMsg, setAlertMsg] = React.useState('');

  const location = useLocation();

  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const requestReset = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let url =
      process.env.NODE_ENV === 'production'
        ? 'https://themusicbox.netlify.app/set-new-password'
        : 'http://localhost:3000/set-new-password';
    const token = location.pathname.split('token=')[1];
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/music-box-api/users/requestPasswordReset`,
        { email, client_url: url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.status === 'successful') {
        setAlertMsg(`Email successfully sent to ${email}`);
        setAlertType('success');
        setOpenAlert(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setAlertMsg('An error occurred Please try again');
        setAlertType('error');
        setOpenAlert(true);
      }
    } catch (error) {
      setIsLoading(false);
      setAlertMsg('An error occurred Please try again');
      setAlertType('error');
      setOpenAlert(true);
    }
    setEmail('');
  };
  return (
    <motion.div initial='out' animate='in' exit='out' variants={pageTransition} transition={transit}>
      <div className={resetPasswordStyles.resetBody}>
        <Alerts
          open={openAlert}
          alertType={alertType as 'success' | 'error'}
          alertMsg={alertMsg}
          onClose={closeAlert}
        />
        <div className={resetPasswordStyles.formCard}>
          <form onSubmit={requestReset}>
            <div className={resetPasswordStyles.header}>
              <h1>Forgot Password</h1>
            </div>
            {/* {successMessage ? <Success /> : null} */}
            <div className={resetPasswordStyles.formGroup}>
              <label>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={resetPasswordStyles.formGroup}>
              <button disabled={!email} type='submit' className={resetPasswordStyles.resetButton}>
                {isLoading ? <Loader type='Bars' color='#2DCEEF' height={20} width={20} /> : 'reset'}
              </button>
            </div>
          </form>
          <small className={resetPasswordStyles.homeBtn}>
            <Link to='/'>Go back to Home</Link>
          </small>
        </div>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
