import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { MenuItem } from '../Navbar/MenuItems';
import { Link, Redirect } from 'react-router-dom';
import mobilClass from '../MobileHomeNav/MobileNav.module.scss';
import { PlaylistMenu } from '../PlaylistNav/PlaylistMenu';
import { AuthContext } from '../../context/AuthContext';
// import MobileNav from '../MobileNav/MobileNav';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  paper: {
    background: '#161a1a',
  },
});

type Anchor = 'left';
interface Menu {
  name: string;
  path: string;
  cRoute?: string;
}
export default function TemporaryDrawer() {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        // [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <span className='text-white my-auto' style={{ display: 'flex', paddingTop: '10px' }}>
          <i
            id={mobilClass.user_circles}
            className='far fa-user-circle'
            style={{
              color: 'white',
              cursor: 'pointer',
              // border: '1.5px solid white',
              // borderRadius: '50%',
              fontSize: '25px',
              marginLeft: '20px',
            }}
          ></i>
          <p style={{ paddingLeft: '10px' }}>
            {' '}
            {user && user.data.firstName ? `${user.data.lastName} ${user.data.firstName}` : <Redirect to='/' />}
          </p>
        </span>
        {MenuItem.map((text: Menu, index: number) => (
          <ListItem button key={index}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <div className={mobilClass.Mobroute}>
              {' '}
              <Link className={mobilClass.route} to={text.path}>
                <ListItemText primary={text.name} />
              </Link>
            </div>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {PlaylistMenu.map((text: Menu, index: number) => (
          <ListItem button key={index}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <div className={mobilClass.Mobroute}>
              {' '}
              <Link className={mobilClass.route} to={text.path}>
                <ListItemText primary={text.name} />
              </Link>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div style={{ color: '#fff' }}>
      {(['left'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <div
            className={mobilClass.Drawer}
            style={{ position: 'absolute', top: 20, right: '2.5rem', backgroundColor: 'transparent' }}
          >
            <Button color='inherit' onClick={toggleDrawer(anchor, true)}>
              <i style={{ fontSize: '20px' }} className='fas fa-bars'></i>
            </Button>
          </div>
          <SwipeableDrawer
            classes={{ paper: classes.paper }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
