import React from 'react'
import styles from './Footer.module.css'
import { Container, Row, Col } from 'react-bootstrap'


const Footer = () => {
    return (
      <div className={styles.footer} style={{ color: 'white' }}>
        <Container fluid className='p-4 mr-3'>
          <Row className={styles.child}>
            <Col md={8}>
              <Row>
                <Col md={3}>
                  <h3>MusicBox</h3>
                </Col>
                <Col md={3}>
                  <h4 style={{ color: '#898b96', fontWeight: 'bold', fontSize: '20px' }}>MUSICBOX</h4>
                  <ul>
                    <li>About</li>
                    <li>Premuim</li>
                    <li>Features</li>
                  </ul>
                </Col>
                <Col md={3}>
                  <h4 style={{ color: '#898b96', fontWeight: 'bold', fontSize: '20px' }}>COMMUNITIES</h4>
                  <ul>
                    <li>For Artists</li>
                    <li>Developers</li>
                    <li>Press</li>
                  </ul>
                </Col>
                <Col md={3}>
                  <h4 style={{ color: '#898b96', fontWeight: 'bold', fontSize: '20px' }}>USEFUL LINKS</h4>
                  <ul>
                    <li>Help</li>
                    <li>Web Player</li>
                    <li>Explore Channels</li>
                    <li>Download App</li>
                  </ul>
                </Col>
              </Row>
            </Col>

            <Col md={4}>
              <div className='py-4 p-4 ml-5' style={{display: 'flex',padding: '5px'}}>
                <p>
                  <i className='fab fa-facebook-square fa-3x'></i>
                </p>
                <p>
                  <i className='fab fa-twitter-square fa-3x'></i>
                </p>
                <p>
                  <i className='fab fa-instagram-square fa-3x'></i>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default Footer
