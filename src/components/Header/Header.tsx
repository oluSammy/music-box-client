import React, { useContext } from 'react';
import styles from './Header.module.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';
import { AuthContext } from '../../context/AuthContext';
interface Props {}

const Header = (props: Props) => {
  const { onHide, setShowSignup, setShowLogin, showLogin, showSignup,isLoggedIn } = useContext(AuthContext);

  const handleShowSignup = () => setShowSignup(true);
  const handleShowLogin = () => setShowLogin(true);

  return (
    <header>
      {' '}
      quesadilla{' '}
      <Navbar className={styles.navcolor} variant='dark' fixed='top' expand='lg'>
        <Navbar.Brand className='ml-5' href='#home'>
          MusicBox
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link href='#home'>Download</Nav.Link>
            <Nav.Link href='#link'>Help</Nav.Link>{' '}
          </Nav>
          {isLoggedIn ? (
            <div className='ml-5'>
              <Button className={styles.buttonOne} variant='dark' size='sm' onClick={handleShowLogin}>
                Log in
              </Button>{' '}
              <Button className={styles.buttonTwo} variant='light' size='sm' onClick={handleShowSignup}>
                Sign up
              </Button>
            </div>
          ) : (
            <div className='ml-5'>
              {' '}
              <Button className={styles.buttonOne} variant='light' size='sm'>
                Logout
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
      {showLogin && <Login show={showLogin} showSignup={handleShowSignup} onHide={onHide} />}
      {showSignup && <SignUp show={showSignup} showLogin={handleShowLogin} onHide={onHide} />}
    </header>
  );
};

export default Header;
