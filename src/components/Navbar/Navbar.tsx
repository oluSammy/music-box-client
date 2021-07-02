import React, { useEffect, useState, ChangeEvent, FormEvent, useRef, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import music_logo from '../../asset/homepageImages/logo_music.png';
import axios from 'axios';
// import {ShowAllAlbum} from "../ShowAllCollection"
import classes from './Navbar.module.scss';
import { Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';
import NavbarRoute from './NavbarRoute';
import { AuthContext } from '../../context/AuthContext'
import './Dropdown.css';
interface Props {}
interface Typing {
  id?: string;
  _id?: string;
  title?: string;
  name?: string;
  cover_small: string;
  picture_small: string;
  artist: {
    name: string;
    picture_small: string;
  };
  imgURL?: string;
}
const defaultImg =
  'https://cdns-images.dzcdn.net/images/artist/726daf1256ee5bd50f222c5e463fe7ae/56x56-000000-80-0-0.jpg';
function NavigationBar(this: any, props: Props) {
  // state for current user
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [allSearch, setAllSearch] = useState([]);

  // state for search album playlist Artist
  const [search, setSearch] = useState('');
  const [album, setAlbum] = useState([] as Typing[]);
  const [artist, setArtist] = useState([] as Typing[]);
  const [playlist, setPlaylist] = useState([] as Typing[]);
  // const [display, setDisplay] = useState(false);

  // useref object
  const container = useRef<HTMLDivElement>(null);
  const authCtx = useContext(AuthContext);
  // {user} = 
  console.log(authCtx);
  
  // const {user} =authCtx;

  // async function loginUser() {
  //   try {
  //     const {
  //       data: { data },
  //     } = await axios.post('https://music-box-b.herokuapp.com/api/v1/music-box-api/users/login', {
  //       email: 'B@gmail.com',
  //       password: '12345',
  //     });
  //     // console.log(data);
  //     localStorage.setItem('token', data.token);
  //     setLastName(data.lastName);
  //     setFirstName(data.firstName);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.target.value.trim() === '') {
      setAlbum([]);
      setArtist([]);
      setPlaylist([]);
    }
    // console.log(allSearch);
  }

  const fetchAll = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/search/?name=${search}`, config);
      const album = data[0].album.map((items: Record<string, any>) => items);
      const artist = data[0].artist.map((items: Record<string, any>) => items);
      const playlist = data[0].playlist.map((items: Record<string, any>) => items);
      setAlbum(album);
      setArtist(artist);
      setPlaylist(playlist);
    } catch (error) {
      console.log(error);
    }
  };

  // handle logout
  // <button onClick={handleLogout}>logout</button>;
  // const handleLogout = () => {
  //   setUser({});
  //   setUsername('');
  //   setPassword('');
  //   localStorage.clear();
  // };

  // function handlePageClick(): any {
  //   console.log(homeRef.current);
  // }
  function handleClickOutside(event: { target: any }) {
    // event.preventDefault()
    if (container.current?.contains(event.target)) {
      return;
    }
    setAlbum([]);
    setArtist([]);
    setPlaylist([]);
    setSearch('');
    event.target.value = '';
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <header>
      <Navbar bg='dark' variant='dark' fixed='top' expand='lg' className={classes.Nav}>
        <Navbar.Brand href='/'>
          <div className={classes.logo_div}>
            <img className={classes.logo} src={music_logo} alt='logo'></img>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='mr-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
            <NavbarRoute />
          </Nav>
          <Form
            className='d-flex'
            style={{ position: 'relative' }}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              fetchAll(e);
            }}
          >
            <FormControl
              type='search'
              placeholder='Search'
              className={classes.search_btn}
              aria-label='Search'
              onChange={handleChange}
              style={{
                borderRadius: '40px',
                color: 'white',
                paddingLeft: '40px',
                width: '200px',
                height: '30px',
                backgroundColor: '#898b91',
                borderStyle: 'none',
              }}
            />
            <div className={classes.ul_div} ref={container}>
              <ul className={classes.ul_list}>
                <div className={classes.searchTitle}>
                  {album.length !== 0 && (
                    <>
                      <p>Album</p>
                      <p>
                        <NavLink to={{ pathname: '/allAlbum', state: { album: album } }} className={classes.views}>
                          View all
                        </NavLink>
                      </p>
                    </>
                  )}
                </div>
                {album && album ? (
                  album.slice(0, 3).map((item: Typing) => (
                      <NavLink className={classes['Nav_link']} to={`/album/${item.id}`} >
                    <li key={item.id}>
                      <div className={classes.searchDetails}>
                        <img className={classes.imgs} src={item.cover_small} alt='artist img'></img>
                        <span>
                          <div className={classes.searchTest}>{item.title}</div>
                          <div className={classes.artistName}>{item.artist.name}</div>
                        </span>
                      </div>
                    </li>
                    </NavLink>
                  ))
                ) : (
                  <></>
                )}
              </ul>
              {/* <div> */}
              <ul className={classes.ul_list}>
                <div className={classes.searchTitle}>
                  {artist.length !== 0 && (
                    <>
                      <p>Artist</p>
                      <p>
                        <NavLink to={{ pathname: '/allArtist', state: { artist: artist } }} className={classes.views}>
                          View all
                        </NavLink>
                      </p>
                    </>
                  )}
                </div>
                {artist && artist ? (
                  artist.slice(0, 3).map((item: Typing) => (
                    <NavLink className={classes['Nav_link']} to={`/artist/${item.id}`}>
                      <li key={item.id}>
                      <div className={classes.searchDetails}>
                        <img className={classes.imgs} src={item.picture_small} alt='artist img'></img>
                        <div className={classes.searchTest}>{item.name}</div>
                      </div>
                    </li>
                    </NavLink>
                  ))
                ) : (
                  <></>
                )}
              </ul>

              <ul className={classes.ul_list}>
                <div className={classes.searchTitle}>
                  {playlist.length !== 0 && (
                    <>
                      <p>Playlist</p>
                      <p>
                        <NavLink
                          to={{ pathname: '/allPlaylist', state: { playlist: playlist } }}
                          className={`${classes.views} ${classes['Nav_link']}`}
                        >
                          View all
                        </NavLink>
                      </p>
                    </>
                  )}
                </div>
                {playlist && playlist ? (
                  playlist.slice(0, 4).map((item: Typing) => (
                    <NavLink className={classes['Nav_link']} to={`/playlist/${item._id}`}>
                      <li key={item._id}>
                      <div className={classes.searchDetails}>
                        <img className={classes.imgs} src={item.imgURL || defaultImg} alt='playlist img'></img>
                        <div className={classes.searchTest}>{item.name}</div>
                      </div>
                    </li>
                    </NavLink>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </div>

            <i
              style={{
                position: 'absolute',
                left: '10px',
                top: '6px',
                cursor: 'pointer',
                border: 'none',
                borderRadius: '50%',
                fontSize: '20px',
                color: '#fff',
              }}
              className='fa fa-search'
            ></i>
          </Form>
          <NavDropdown
            title={
              <span className='text-white my-auto'>
                <i
                  id={classes.user_circles}
                  className='far fa-user-circle'
                  style={{
                    color: 'white',
                    cursor: 'pointer',
                    // border: '1.5px solid white',
                    // borderRadius: '50%',
                    fontSize: '25px',
                    marginRight: '10px',
                  }}
                ></i>
                {/* {user.firstName? `${user.lastName} ${user.firstName}`: <Redirect to= "/"/>} */}
              </span>
            }
            id='collasible-nav-dropdown'
          >
            <NavDropdown.Item href='#action/3.1'>Profile</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>Logout</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default NavigationBar;
