import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import playlistClass from './ShowAllAlbum.module.scss';
import ash_sm from '../../asset/homepageImages/ash_sm.jpg';

interface Recent {
  id: string;
  title: string;
  cover_medium: string;
  picture_medium: string;
  name: string;
}
interface LocationState {
  artist: Recent[];
}
export default function ShowAllPlaylist() {
  const location = useLocation<LocationState>();
  const { artist } = location.state;
  return (
    <div className={playlistClass.allArtist}>
      {artist.map((item) => (
        <NavLink to={`/artist/${item.id}`} className={playlistClass.Nav_link}>
          <div className={playlistClass.artist_img} key={item.id}>
            <img className={playlistClass.img || ash_sm} src={item.picture_medium} alt='artist img'></img>
            <div className={playlistClass.title}> {item.name} </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
