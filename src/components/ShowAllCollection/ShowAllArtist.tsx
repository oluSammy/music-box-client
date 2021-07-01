import React from 'react';
import { useLocation } from 'react-router-dom';
import playlistClass from './ShowAllAlbum.module.scss';

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
        <div className={playlistClass.artist_img} key={item.id}>
          <img className={playlistClass.img} src={item.picture_medium} alt='artist img'></img>
          <div className={playlistClass.title}> {item.name} </div>
        </div>
      ))}
    </div>
  );
}
