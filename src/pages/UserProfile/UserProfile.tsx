import React from 'react';
import axios from 'axios';
import PasswordModal from '../../components/Password/changePassword';
import Toast from '../../components/Toast/Toast';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Button,
  //   Container,
  Avatar,
  Typography,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  makeStyles,
  Theme,
  createStyles,
  Menu,
  //   TextField,
  MenuItem,
  ButtonGroup,
} from '@material-ui/core';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import Form from '../../components/Form/Form';

import './changePassword.css';
import './UserProfile.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  })
);

interface info {
  oldPassword: string;
  newPassword: string;
}

const UserProfile: React.FC = () => {
  const css = useStyles();
  const history = useHistory();

  // States
  const languages = ['English', 'Spanish', 'Russian', 'German'];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(0);
  const [switchState, setSwitchState] = React.useState(false);
  const [field, setField] = React.useState({
    modal: false,
    toast: '',
  });
  const [error, setError] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  // Event handlers
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemSelect = (index: number) => {
    setSelectedMenuItem((item) => index);
  };

  const triggerChangePassword = () => {
    setField({ ...field, modal: true });
  };

  const logOut = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('userId');
    history.push('/');
    console.log('logged out');
  };

  const changePassword = async (event: any) => {
    try {
      event.preventDefault();

      if (newPassword !== confirmPassword) {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setError('');
        }, 5000);
        return setError('Password Mismatch');
      }

      const data: info = {
        oldPassword,
        newPassword,
      };

      const userToken = localStorage.getItem('Token');
      const userId = localStorage.getItem('userId');
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      await axios.put(`https://music-box-b.herokuapp.com/api/v1/music-box-api/change-password/${userId}`, data, config);

      setField({
        ...field,
        modal: false,
        toast: 'Your password was changed successfully',
      });

      setTimeout(
        () =>
          setField({
            ...field,
            modal: false,
            toast: '',
          }),
        2000
      );
    } catch (error) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <>
      <div className='div-container'>
        <PasswordModal
          show={field.modal}
          close={() => {
            setField({ ...field, modal: false });
          }}
        >
          <form className='form1' onSubmit={changePassword}>
            {error && <span className='error-message'>{error}​ </span>}​
            <div className='modalHeader'>Change Password</div>
            <div className='contentWrap'>
              <span>
                <label>Old Password</label>
                <br />
                <input
                  type='password'
                  placeholder=''
                  className='title'
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </span>

              <br />
              <div className='genreCat'>
                <span>
                  <label>New Password</label>
                  <br />
                  <input
                    type='password'
                    className='title'
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </span>
              </div>
              <br />
              <div className='genreCat'>
                <span>
                  <label>Confirm New Password</label>
                  <br />
                  <input
                    type='password'
                    className='title'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </span>
              </div>
              <br />
              <span className='btnContainer'>
                <button
                  className='cancelBtn'
                  onClick={() => {
                    setField({ ...field, modal: false });
                  }}
                >
                  Cancel
                </button>
                <button type='submit' className='createBtn'>
                  Submit
                </button>
              </span>
            </div>
          </form>
        </PasswordModal>

        <div className='profile-header'>
          <div className='profile-grid'>
            <Grid item>
              <Avatar className={css.large} />
            </Grid>
            <button className='premium-btn'>go to premium</button>
          </div>
        </div>
        <Typography style={{ fontWeight: 'bold' }} gutterBottom>
          Contact
        </Typography>

        {/* Form Section*/}
        <Form />

        {/* Social Login Section*/}
        <div className='social-login'>
          <Grid className='social' container justify='space-between' alignItems='center'>
            <Typography>Facebook</Typography>
            <Typography className='social-text' color='textSecondary'>
              Not connected
            </Typography>
          </Grid>

          <Grid className='social' container justify='space-between' alignItems='center'>
            <Typography>Google</Typography>
            <Typography className='social-text' color='textSecondary'>
              Not connected
            </Typography>
          </Grid>
        </div>
        {/* Streaming Section Begins */}
        <section className='streaming-section section'>
          <Typography style={{ fontWeight: 'bold' }} className='streaming' variant='h6'>
            Streaming
          </Typography>
          <Typography variant='body1'>Audio Quality (Premium Features)</Typography>

          <hr className='divider' />

          <FormControl component='fieldset'>
            <RadioGroup aria-label='gender' name='gender1'>
              <FormControlLabel className='radio' value='female' control={<Radio />} label='Normal(128 kb/s)' />
              <FormControlLabel className='radio' value='male' control={<Radio />} label='High ()' />
              <FormControlLabel className='radio' value='other' control={<Radio />} label='Medium()' />
            </RadioGroup>
          </FormControl>

          <hr className='divider' />
        </section>
        {/* Streaming Section ends */}
        <Divider />
        {/* Account Section begins */}
        <section className='account-section section'>
          <Typography style={{ fontWeight: 'bold' }} className='sub-head' gutterBottom variant='h6'>
            Account
          </Typography>

          <div className='list-items'>
            <List className='list'>
              <ListItem className='account-list-item'>
                <ListItemText id='switch-list-label-wifi' primary='Enable Browser Notification' />
                <ListItemSecondaryAction className='switch'>
                  <Switch
                    edge='end'
                    checked={switchState}
                    className='color'
                    onChange={({ target }) => setSwitchState((state) => target.checked as boolean)}
                    // style={{ color: '#999' }}
                    color='default'
                    inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem className='account-list-item'>
                <ListItemText id='switch-list-label-wifi' primary='Language' />
                <ListItemSecondaryAction>
                  <ButtonGroup variant='text' size='small'>
                    <Button
                      aria-controls='simple-menu'
                      aria-haspopup='true'
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownOutlinedIcon style={{ color: 'white' }} />}
                      size='small'
                    >
                      <Typography variant='body2' style={{ color: 'white' }}>
                        {languages[selectedMenuItem]}
                      </Typography>
                    </Button>

                    <Menu
                      id='simple-menu'
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {languages.map((language, index) => (
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            handleMenuItemSelect(index);
                          }}
                        >
                          {language}
                        </MenuItem>
                      ))}
                    </Menu>
                  </ButtonGroup>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem className='account-list-item'>
                <ListItemText
                  onClick={triggerChangePassword}
                  className='change-password'
                  id='switch-list-label-wifi'
                  primary='Change Password'
                />
              </ListItem>

              <ListItem className='account-list-item'>
                <ListItemText id='switch-list-label-wifi' primary='Add New Account' />
              </ListItem>

              <ListItem className='account-list-item privacy'>
                <ListItemText id='switch-list-label-wifi' primary='Terms & Conditions' />
              </ListItem>

              <ListItem className='account-list-item privacy'>
                <ListItemText id='switch-list-label-wifi' primary='Privacy' />
              </ListItem>

              <ListItem className='account-list-item privacy'>
                <ListItemText id='switch-list-label-wifi' primary='Support' />
              </ListItem>
            </List>
          </div>
        </section>
        {/* Account Section ends */}
        <Toast toast={field.toast} close={null} />
        <div className='container'>
          <Button onClick={logOut} className='button log-out' variant='outlined' disableElevation>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
