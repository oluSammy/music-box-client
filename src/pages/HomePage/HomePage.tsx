import React, { useRef, useEffect, useState, useContext } from 'react';
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
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CustomizedAlerts from '../../ui/Alert/Alert';

function Home() {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMsg, setAlertMsg] = useState('');
  const history = useHistory();
  const { state } = history.location;
  const from = state ? (state as { from: string }).from : '';
  const ctx = useContext(AuthContext);
  const { firstName } = ctx.user.data;
  const overviewRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);
  const mostPlayedRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (from && from === 'login') {
      setAlertMsg(`welcome ${firstName}`);
      setAlertType('success');
      setOpenAlert(true);
    } else {
      setOpenAlert(false);
    }
  }, [from, firstName]);

  return (
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
        <Flows image={ash_sm} playIcon='fas fa-play' pauseIcon='fas fa-pause' bgImg={BG_ash} color={'#adb7c6'} />
        <Flows image={BGblue} playIcon='fas fa-plus' bgImg={BGblue} color={'#8472ef'} />
        <Flows image={Favorite} playIcon='fas fa-plus' bgImg={BGgreen} color={'#6ad462'} />
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
    </div>
  );
}

export default Home;
