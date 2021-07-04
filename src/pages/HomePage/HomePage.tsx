import React, { useRef } from 'react';
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
// import { NavLink } from "react-router-dom";
import MobileHompageNav from './MobileHompageNav';
function Home() {
  const overviewRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);
  const mostPlayedRef = useRef<HTMLDivElement>(null);
  // const executeScroll = (ref: React.RefObject<HTMLDivElement>) =>
  //   ref.current ? ref.current.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' }) : null;

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
        <Flows image={ash_sm} icon='fas fa-play' bgImg={BG_ash} color={'#adb7c6'} />
        <Flows image={BGblue} icon='fas fa-plus' bgImg={BGblue} color={'#8472ef'} />
        <Flows image={Favorite} icon='fas fa-plus' bgImg={BGgreen} color={'#6ad462'} />
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
    </div>
  );
}

export default Home;
