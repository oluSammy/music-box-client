// import NatureImg from '../../asset/homepageImages/Nature.png';
import recentPlayedClass from './Played.module.scss';
import playlistRadio from '../../asset/homepageImages/playlistRadio.png';
import React, { useEffect, useState } from 'react';
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
  // set state for resently played
  const [recent, setRecent] = useState({} as RecentType);

  const url = 'https://music-box-b.herokuapp.com/api/v1/music-box-api/';

  const getRecentlyPlayedPlaylist = async () => {
    try {
      const userToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const {
        data: { data: response },
      } = await axios.get<AxiosResponse<RecentType>>(`${url}recently-played`, config);
      console.log(response);

      setRecent(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  // getRecentlyPlayedPlaylist()

  useEffect(() => {
    getRecentlyPlayedPlaylist();
  }, []);

  function isObjectEmpty(obj: {}) {
    if (Object.getOwnPropertyNames(obj).length === 0) return 1;
    return 0;
  }

  // optional chainning
  if (isObjectEmpty(recent)) return <div>no...</div>;
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
