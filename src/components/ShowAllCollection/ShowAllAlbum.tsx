import React from 'react';
import { useLocation } from "react-router-dom";
import albumClass from "./ShowAllAlbum.module.scss";

interface Recent {
  ownerId: string;
  title: string;
  id: string;
  cover_medium: string;
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
interface LocationState {
  album: Recent[]
}
export default function ShowAllAlbum () {

  const location = useLocation<LocationState>()
  const { album } = location.state
    return (
      <div className={albumClass.allAlbum}>
        {album.map((item) => (
          <div className={albumClass.album_img} key={item.id}>
            <img className={albumClass.imgs} src={item.cover_medium} alt='artist img'></img>
            <div className={albumClass.title}>{item.title}</div>
          </div>
        ))}
      </div>
    );
}
