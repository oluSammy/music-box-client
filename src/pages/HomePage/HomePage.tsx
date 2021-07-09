import React, { useRef, useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Flows from '../../components/Flow/Flow';
import classHome from './HomePage.module.scss';
import RecentlyPlayedCardRound from '../../components/Flow/RecentPlayed';
import MostPlayedArtist from '../../components/MostPlayedArtist/MostplayedArtist';
import GenreList from '../../components/GenreList/GenreList';
import MobileNav from '../../components/MobileNav/MobileNav';
import BGblue from '../../asset/homepageImages/BGblue.png';
import BGgreen from '../../asset/homepageImages/BGgreen.png';
import BG_ash from '../../asset/homepageImages/BG_ash.png';
import ash_sm from '../../asset/homepageImages/ash_sm.jpg';
import Favorite from '../../asset/homepageImages/Favorite.png';
import MobileHompageNav from './MobileHompageNav';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CustomizedAlerts from '../../ui/Alert/Alert';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
import Spinner from '../../ui/Loader/Loader';
import BackdropRoller from '../../ui/Backdrop/Backdrop';
import axios from 'axios';
import useMusicPlayer from '../../hooks/useMusicPlayer';
import Modal from '../../ui/Modal/Modal';

function Home() {
  const [open, setOpen] = React.useState(false);
  const { toggleMusicPlay, playing } = useMusicPlayer();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMsg, setAlertMsg] = useState('');
  const location = useLocation();
  const { state } = location;
  const from = state ? (state as { from: string }).from : '';
  const ctx = useContext(AuthContext);
  const { firstName } = ctx.user.data;
  const overviewRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);
  const mostPlayedRef = useRef<HTMLDivElement>(null);
  const [spinLoader, setSpinLoader] = useState(true);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const { token } = ctx.user;
  const history = useHistory();
  const URL = 'https://music-box-b.herokuapp.com/api/v1/music-box-api';
  // const executeScroll = (ref: React.RefObject<HTMLDivElement>) =>
  //   ref.current ? ref.current.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' }) : null;
  // const executeScroll = (ref: React.RefObject<HTMLDivElement>) =>
  //   ref.current ? ref.current.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' }) : null;

  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const addData = async (data: Record<string, any>) => {
    setOpenBackdrop(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${URL}/playlist`, data, config);
      setOpenBackdrop(false);
      setAlertMsg('Playlist added successfully');
      setAlertType('success');
      setOpenAlert(true);
      history.push('/library');
    } catch (error) {
      console.log(error.response.data.message);
      setOpenBackdrop(false);
    }
  };

  const openPlaylistModal = () => {
    setOpen(true);
  };

  const handleClick = () => {
    //
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const prev = localStorage.getItem('prevRoute');
    if ((from && from === 'login') || prev === 'login') {
      setAlertMsg(`welcome ${firstName}`);
      setAlertType('success');
      setOpenAlert(true);
      localStorage.removeItem('prevRoute');
      setSpinLoader(false);
    } else {
      setOpenAlert(false);
      setSpinLoader(false);
    }
  }, [from, firstName]);

  return (
    <React.Fragment>
      {spinLoader && <Spinner />}
      {!spinLoader && (
        <motion.div initial='out' animate='in' exit='out' variants={pageTransition} transition={transit}>
          <div ref={overviewRef} className={classHome.home_div}>
            <div className={classHome.titles}>
              <h4>Flow</h4>
              <h1 className={classHome.hidenHome}>Home</h1>
              <i className='fas fa-ellipsis-h'></i>
            </div>
            <div>
              <MobileHompageNav />
            </div>
            {/* <div className={classHome.activePOS}></div> */}
            <div className={classHome.mobile_nav}>
              <MobileNav />
            </div>

            <div className={classHome.home_card}>
              <Flows
                playing={playing}
                clickHandle={toggleMusicPlay}
                image={ash_sm}
                playIcon='fas fa-play'
                pauseIcon='fas fa-pause'
                bgImg={BG_ash}
                color={'#adb7c6'}
              />
              <Flows
                playing={playing}
                clickHandle={openPlaylistModal}
                image={BGblue}
                playIcon='fas fa-plus'
                bgImg={BGblue}
                color={'#8472ef'}
              />
              <Flows
                playing={playing}
                clickHandle={handleClick}
                image={Favorite}
                playIcon='fas fa-plus'
                bgImg={BGgreen}
                color={'#6ad462'}
              />
              {/* <Flows />  */}
            </div>
            <div className={classHome.played_recent}>
              <h4>Recently Played</h4>
            </div>
            <div className={classHome.recent_played}>
              <RecentlyPlayedCardRound />
            </div>
            <div ref={genreRef} className={classHome.genre_div}>
              <div className={classHome.played_recent}>
                <h4>Browse Genres</h4>
                <p className={classHome.genre_P}>Browse by genre and mood</p>
              </div>
              <GenreList />
            </div>
            <div className={classHome.played_recent}>
              <h4>Most Played Artist</h4>
            </div>
            <div ref={mostPlayedRef} className={classHome.mostPlayed_artist}>
              <MostPlayedArtist />
            </div>
            <CustomizedAlerts
              alertMsg={alertMsg}
              alertType={alertType as 'success' | 'error'}
              open={openAlert}
              onClose={closeAlert}
            />
            <Modal onAddPlaylist={addData} onOpen={open} onHandleClose={handleClose} />
            <BackdropRoller open={openBackdrop} />
          </div>
        </motion.div>
      )}
    </React.Fragment>
  );
}

export default Home;
