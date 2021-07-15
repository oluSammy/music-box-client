// import NatureImg from '../../asset/homepageImages/Nature.png';
import recentPlayedClass from './Played.module.scss';
// import playlistRadio from '../../asset/homepageImages/playlistRadio.png';
// import Image_def from '../../asset/homepageImages/Image_def.png';
import ash_sm from '../../asset/homepageImages/ash_sm.jpg';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useMusicPlayer from '../../hooks/useMusicPlayer';
// import { IoIosMusicalNotes } from 'react-icons/io';

// import classnames from "classnames"

import axios, { AxiosResponse } from 'axios';
import { NavLink } from 'react-router-dom';

interface Recent {
  _id: string;
  onModel: string;
  imgURL: string;
  directory_info: {
    title: string;
    name: string;
    artist: {
      id: string;
    };
    id: string;
    _id: string;
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
        <div className={recentPlayedClass.cardDiv}>
          <div className={recentPlayedClass.smallCard}>
            <i
              style={{
                color: '#fff',
                margin: 'auto auto',
                fontSize: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className='fas fa-music'
            ></i>
            <p style={{ color: '#fff', margin: '1rem 1rem', fontSize: '15px' }}>recently played song will be here</p>
          </div>
        </div>
      ) : (
        <div className={recentPlayedClass.parent_div}>
          {recent.artist && recent.artist?.length !== 0 && (
            <div className={recentPlayedClass.rounded}>
              <NavLink to={`/artist/${recent.artist[0].directory_info.id}`}>
                <div className={recentPlayedClass.Sm_cardRound}>
                  <img src={recent.artist?.[0].directory_info?.picture_medium || ash_sm} alt='pc' />
                  <div className={recentPlayedClass.play_icon} onClick={toggleMusicPlay}>
                    <i className={playing ? 'fas fa-play' : 'fas fa-play'}></i>
                  </div>
                </div>
              </NavLink>
              <div className={recentPlayedClass.like}>
                <p>{recent.artist?.[0].directory_info?.name}</p>
                <p className={recentPlayedClass.type}>artist</p>
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
                <NavLink to={`/playlist/${recent.playlist[0].directory_info._id}`}>
                  <img src={recent.playlist?.[0].imgURL || ash_sm} alt='pc' />
                  <div className={recentPlayedClass.play_icon} onClick={toggleMusicPlay}>
                    <i className={playing ? 'fas fa-play' : 'fas fa-play'}></i>
                  </div>
                </NavLink>
              </div>
              <div className={recentPlayedClass.likes}>
                <p>{recent.playlist?.[0].directory_info?.name}</p>
                <p className={recentPlayedClass.type}>playlist</p>
                <i className='fas fa-heart'>
                  {' '}
                  <span>{recent.playlist?.[0].directory_info?.likesCount}</span>
                </i>
              </div>
            </div>
          )}
          {recent && recent.album?.length !== 0 && (
            <div className={recentPlayedClass.sm_square}>
              <NavLink to={`/album/${recent.album[0].directory_info.id}`}>
                <div className={recentPlayedClass.Sm_card}>
                  <img src={recent.album?.[0].directory_info?.cover_medium || ash_sm} alt='pc' />
                  <div className={recentPlayedClass.play_icon} onClick={toggleMusicPlay}>
                    {/* <div className={[recentPlayedClass.play_icon, recentPlayedClass.play_pos].join(' ')}> */}

                    <i className={playing ? 'fas fa-play' : 'fas fa-play'}></i>
                  </div>
                </div>
              </NavLink>
              <div className={recentPlayedClass.likes}>
                <p>{recent.album?.[0].directory_info?.title}</p>
                <p className={recentPlayedClass.type}>album</p>
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
