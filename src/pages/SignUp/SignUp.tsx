import React, { useState, useContext } from 'react';
import styles from './SignUp.module.css';
import { Row, Col } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../context/AuthContext';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { Button, Modal, Form} from 'react-bootstrap';
interface Props {
  //declare props here
  show: boolean;
  onHide: () => void;
  showLogin: () => void;
}

const SignUp = ({ show, onHide, showLogin }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');

  const { error, isloading, setError, register } = useContext(AuthContext);

  return (
    <div>
      <Modal show={show} onHide={onHide} animation={true} className={styles.modalbg}>
        <Modal.Header closeButton style={{ border: 'none' }}></Modal.Header>
        <Modal.Header className={styles.modalheader}>
          <Modal.Title style={{ marginTop: '1rem', margin: 'auto', fontWeight: 'bold' }}>
            Ready to Sign Up today?
          </Modal.Title>
        </Modal.Header>
        {error && <Message message={error} clearError={() => setError('')} />}
        {isloading && <Loader />}
        <Form onSubmit={(e) => register(e, email, password, firstName, lastName, date, gender)}>
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
                    <div className={styles.fbDiv}>
                      <p className={styles.fbDivp}>
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
                    <div className={styles.gDiv}>
                      <p className={styles.gDivp}>
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
              <Form.Group className='mb-3' controlId='firstName'>
                <Form.Control
                  type='firstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name='firstName'
                  placeholder='Firstname'
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='lastname'>
                <Form.Control
                  type='lastname'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Lastname'
                />
              </Form.Group>
              <Row>
                <Col md={6} xs={6}>
                  <Form.Group className='mb-3' controlId='dob'>
                    <Form.Control
                      type='date'
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder='Date of Birth'
                    />
                  </Form.Group>
                </Col>
                <Col md={6} xs={6}>
                  <Form.Group controlId='ControlSelect1'>
                    <Form.Control type='gender' value={gender} onChange={(e) => setGender(e.target.value)} as='select'>
                      <option value='none' selected hidden>
                        Select Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            {/* <div>
              <Button>Facebook</Button>
              <Button>Google</Button>
            </div> */}
            <div>
              <p className='mb-1' style={{ textAlign: 'center' }}>
                By clicking on "Sign up", you accept the <br />
                <span style={{ color: '#ffff' }}>Terms and Conditions of Use</span>
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className='mb-2' style={{ border: 'none', marginTop: '-1rem', justifyContent: 'center' }}>
            <Button className={styles.signup} type='submit'>
              SIGN UP FOR MUSICBOX
            </Button>
            <div style={{ textAlign: 'center' }}>
              <p>
                Already have account?{' '}
                <span
                  style={{ color: '#ffff', textDecoration: 'underline' }}
                  onClick={() => {
                    showLogin();
                  }}
                >
                  Log in
                </span>
              </p>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default SignUp;
