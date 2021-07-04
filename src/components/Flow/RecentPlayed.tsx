// import NatureImg from '../../asset/homepageImages/Nature.png';
import recentPlayedClass from './Played.module.scss';
import playlistRadio from '../../asset/homepageImages/playlistRadio.png';
import Image_def from '../../asset/homepageImages/Image_def.png';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

// import classnames from "classnames"

import axios, { AxiosResponse } from 'axios';

interface Recent {
  _id: string;
  onModel: string;
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

  function isObjectEmpty(obj: {}) {
    if (Object.getOwnPropertyNames(obj).length === 0) return 1;
    return 0;
  }

  // optional chainning
  if (isObjectEmpty(recent)) return (
    <div className={recentPlayedClass.sm_square}>
      <img style={{ borderRadius: '50%' }} className={recentPlayedClass.Sm_card} alt='IMG' src={Image_def}></img>
      <p style={{ color: '#fff', marginLeft: '20px', fontSize: '15px' }}>Add by playing a song</p>
    </div>
  );
  return (
    <div className={recentPlayedClass.parent_div}>
      {recent && recent.artist.length !== 0 && (
        <div className={recentPlayedClass.rounded}>
          <div className={recentPlayedClass.Sm_cardRound}>
            <img src={recent.artist?.[0].directory_info?.picture_medium} alt='pc' />
            <div className={recentPlayedClass.play_icon}>
              <i className='fas fa-play'></i>
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
      {recent && recent.playlist.length !== 0 && (
        <div className={recentPlayedClass.sm_square}>
          <div className={recentPlayedClass.Sm_card}>
            <img src={playlistRadio} alt='pc' />
            <div className={recentPlayedClass.play_icon}>
              <i className='fas fa-play'></i>
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
      {recent && recent.album.length !== 0 && (
        <div className={recentPlayedClass.sm_square}>
          <div className={recentPlayedClass.Sm_card}>
            <img src={recent.album?.[0].directory_info?.cover_medium} alt='pc' />
            <div className={recentPlayedClass.play_icon}>
              {/* <div className={[recentPlayedClass.play_icon, recentPlayedClass.play_pos].join(' ')}> */}
              <i className='fas fa-play'></i>
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
  );
}
export default RecentlyPlayedArtist;
