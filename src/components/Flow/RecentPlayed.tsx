// import NatureImg from '../../asset/homepageImages/Nature.png';
import recentPlayedClass from './Played.module.scss';
// import playlistRadio from '../../asset/homepageImages/playlistRadio.png';
import Image_def from '../../asset/homepageImages/Image_def.png';
import ash_sm from '../../asset/homepageImages/ash_sm.jpg';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useMusicPlayer from '../../hooks/useMusicPlayer';

// import classnames from "classnames"

import axios, { AxiosResponse } from 'axios';

interface Recent {
  _id: string;
  onModel: string;
  imgURL: string;
  directory_info: {
    title: string;
    name: string;
    likedCount: number;
    likeCount: number;
    likesCount: number;
    picture_medium: string;
    cover_medium: string;
  };
}
interface RecentType {
  artist: Recent[];
  playlist: Recent[];
  album: Recent[];
}

function RecentlyPlayedArtist() {
  const { user } = useContext(AuthContext);
  const { toggleMusicPlay, playing } = useMusicPlayer();
  // set state for resently played
  const [recent, setRecent] = useState({} as RecentType);

  const url = 'https://music-box-b.herokuapp.com/api/v1/music-box-api/';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRecentlyPlayedPlaylist = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {
        data: { data: response },
      } = await axios.get<AxiosResponse<RecentType>>(`${url}recently-played`, config);

      setRecent(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  // getRecentlyPlayedPlaylist()

  useEffect(() => {
    getRecentlyPlayedPlaylist();
  }, [getRecentlyPlayedPlaylist]);

  function isObjectEmpty(obj: RecentType) {
    if (Object.keys(obj).length > 0)
      return obj['artist'].length === 0 && obj['playlist'].length === 0 && obj['album'].length === 0;
    return true;
  }
  // optional chainning
  return (
    <>
      {isObjectEmpty(recent) ? (
        <div className={recentPlayedClass.sm_square}>
          <img style={{ borderRadius: '50%' }} className={recentPlayedClass.Sm_card} alt='IMG' src={Image_def}></img>
          <p style={{ color: '#fff', marginLeft: '20px', fontSize: '15px' }}>Add more by playing a song</p>
        </div>
      ) : (
        <div className={recentPlayedClass.parent_div}>
          {recent.artist && recent.artist?.length !== 0 && (
            <div className={recentPlayedClass.rounded}>
              <div className={recentPlayedClass.Sm_cardRound}>
                <img src={recent.artist?.[0].directory_info?.picture_medium || ash_sm} alt='pc' />
                <div className={recentPlayedClass.play_icon} onClick={toggleMusicPlay}>
                  <i className={playing ? 'fas fa-play' : 'fas fa-play'}></i>
                </div>
              </div>
              <div className={recentPlayedClass.like}>
                <p>{recent.artist?.[0].directory_info?.name}</p>
                <i className='fas fa-heart'>
                  {' '}
                  <span>{recent.artist?.[0].directory_info?.likedCount}</span>
                </i>
              </div>
            </div>
          )}
          {recent && recent.playlist?.length !== 0 && (
            <div className={recentPlayedClass.sm_square}>
              <div className={recentPlayedClass.Sm_card}>
                <img src={recent.playlist?.[0].imgURL || ash_sm} alt='pc' />
                <div className={recentPlayedClass.play_icon} onClick={toggleMusicPlay}>
                  <i className={playing ? 'fas fa-play' : 'fas fa-play'}></i>
                </div>
              </div>
              <div className={recentPlayedClass.likes}>
                <p>{recent.playlist?.[0].directory_info?.name}</p>
                <i className='fas fa-heart'>
                  {' '}
                  <span>{recent.playlist?.[0].directory_info?.likesCount}</span>
                </i>
              </div>
            </div>
          )}
          {recent && recent.album?.length !== 0 && (
            <div className={recentPlayedClass.sm_square}>
              <div className={recentPlayedClass.Sm_card}>
                <img src={recent.album?.[0].directory_info?.cover_medium || ash_sm} alt='pc' />
                <div className={recentPlayedClass.play_icon} onClick={toggleMusicPlay}>
                  {/* <div className={[recentPlayedClass.play_icon, recentPlayedClass.play_pos].join(' ')}> */}
                  <i className={playing ? 'fas fa-play' : 'fas fa-play'}></i>
                </div>
              </div>
              <div className={recentPlayedClass.likes}>
                <p>{recent.album?.[0].directory_info?.title}</p>
                <i className='fas fa-heart'>
                  {' '}
                  <span>{recent.album?.[0].directory_info?.likeCount}</span>
                </i>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default RecentlyPlayedArtist;
