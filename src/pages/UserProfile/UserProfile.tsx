import React from 'react';
import {
  Grid,
  Button,
  Container,
  Avatar,
  Typography,
  TextField,
  MenuItem,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,makeStyles,Theme, createStyles
} from '@material-ui/core';
import Form from '../../components/Form/Form';
import './UserProfile.css';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);

const UserProfile: React.FC = () => {
    const css =  useStyles();

  return (
    <>
      <Container style={{ maxWidth: '55%' }}>
        <div className='profile-header'>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              <Avatar className={css.large} />
            </Grid>
            <Button className='button' variant='contained'>
              go to premium
            </Button>
          </Grid>
        </div>

        <Typography style={{ fontWeight: 'bold' }} gutterBottom>
          Contact
        </Typography>

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
                <ListItemSecondaryAction className="switch">
                  <Switch edge='end' inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }} />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem className='account-list-item'>
                <ListItemText id='switch-list-label-wifi' primary='Language' />
                <ListItemSecondaryAction>
                  <TextField id='language' label='Language' select>
                    <MenuItem>english</MenuItem>
                  </TextField>
                </ListItemSecondaryAction>
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

        <div className="container">
            <Button className='button log-out' variant='outlined' disableElevation>
            Logout
            </Button>
        </div>
      </Container>
    </>
  );
};

export default UserProfile;
