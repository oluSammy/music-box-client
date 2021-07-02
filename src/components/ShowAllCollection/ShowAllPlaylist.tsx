import React from 'react';
import { useLocation } from 'react-router-dom';
import albumClass from './ShowAllAlbum.module.scss';

interface Recent {
  ownerId: string;
  title: string;
  id: string;
  cover_medium: string;
  name: string;
  directory_info: {
    title: string;
    likedCount: number;
    likeCount: number;
    likesCount: number;
    picture_medium: string;
    cover_medium: string;
  };
}
interface LocationState {
  playlist: Recent[];
}
const defaultImg =
  'https://cdns-images.dzcdn.net/images/artist/726daf1256ee5bd50f222c5e463fe7ae/56x56-000000-80-0-0.jpg';
export default function ShowAllAlbum() {
  const location = useLocation<LocationState>();
  const { playlist } = location.state;
  console.log(playlist);
  return (
    <div className={albumClass.allAlbum}>
      {playlist.map((item) => (
        <div className={albumClass.album_img} key={item.ownerId}>
          <img className={albumClass.imgs} src={defaultImg} alt='artist img'></img>
          <div className={albumClass.title}>{item.name}</div>
        </div>
      ))}
    </div>
  );
}
