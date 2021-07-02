import React, { useState, useContext } from 'react';
import styles from './Login.module.css';
import { Row, Col } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { Button, Modal, Form } from 'react-bootstrap';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { AuthContext } from '../../context/AuthContext';
interface Props {
  //declare props here
  show: boolean;
  onHide: () => void;
  showSignup: () => void;
}

const Login = ({ show, onHide, showSignup }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const { error, isloading, setError, login } = useContext(AuthContext);
  return (
    <div>
      <Modal show={show} onHide={onHide} animation={true} className={styles.modalbg}>
        <Modal.Header closeButton style={{ border: 'none' }}></Modal.Header>
        <Modal.Header className={styles.modalheader}>
          <Modal.Title style={{ marginTop: '1rem', margin: 'auto', fontWeight: 'bold' }}>
            What will you listen to today?
          </Modal.Title>
        </Modal.Header>
        {error && <Message message={error} clearError={() => setError('')} />}
        {isloading && <Loader />}
        <Form onSubmit={(e) => login(e, email, password)}>
          <Modal.Body style={{ border: 'none' }}>
            <div className='container-fluid'>
              <div className='row mx-auto'>
                <div className='col-md-6 d-flex justify-content-end'>
                  <Button
                    className={styles.buttonOone}
                    variant='light'
                    size='sm'
                    href='https://music-box-b.herokuapp.com/api/v1/music-box-api/fb/facebook'
                  >
                    <div style={{ display: 'flex' }}>
                      <p style={{ marginLeft: '1rem' }}>
                        <i className='fab fa-facebook-square fa-2x'></i>
                      </p>
                      <p className={styles.fbButton}>Facebook</p>
                    </div>
                  </Button>
                </div>
                <div className='col-md-6 d-flex justify-content-start'>
                  <Button
                    className={styles.buttonTtwo}
                    variant='light'
                    size='sm'
                    href='https://music-box-b.herokuapp.com/api/v1/music-box-api/auth/google'
                  >
                    <div style={{ display: 'flex' }}>
                      <p style={{ marginLeft: '1rem' }}>
                        <FcGoogle size={24} />
                      </p>
                      <p className={styles.gButton}>Google</p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            <div className='py-4'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter email'
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Control
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                />
              </Form.Group>
              <Row>
                <Col md={6} xs={6}>
                  <Form.Group className='mb-3' controlId='rememberme'>
                    <Form.Check type='checkbox' label='Remember me' />
                  </Form.Group>
                </Col>
                <Col md={6} xs={6}>
                  <Button className={styles.login} variant='primary' type='submit'>
                    LOG IN
                  </Button>
                </Col>
              </Row>
            </div>
            <div>
              <p className='mb-3' style={{ textAlign: 'center', color: '#2d9bef' }}>
                Forgot your password?
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p>Don't have an account?</p>
            </div>
          </Modal.Body>
        </Form>
        <Modal.Footer style={{ border: 'none', marginTop: '-2rem', justifyContent: 'center' }}>
          <Button
            onClick={() => {
              showSignup();
            }}
            className={styles.Slogin}
            variant='light'
            type='submit'
          >
            SIGN UP FOR MUSICBOX
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
