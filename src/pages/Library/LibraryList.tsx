import React from 'react';
import classes from './LibraryList.module.css';
import Avatar from '../../assets/library/rock.png';
import { useHistory, useLocation } from 'react-router-dom';
// import getImageByKey from '../../utils/getImageByKey';

interface Props {
  //declare props here
  name?: string;
  description?: string;
  key?: any;
  id?: string;
  image?: string;
}
const LibraryList = (props: Props) => {
  const { pathname } = useLocation();
  let routePath = '';
  const path = pathname.split('/')[2];
  if (path === 'playlist') routePath = 'Playlists';
  if (path === 'album') routePath = 'Albums';
  if (path === 'artist') routePath = 'Artists';
  // const artistsName = ['artistOne', 'artistTwo', 'artistThree'];
  // const albumName = ['albumOne', 'albumTwo', 'albumThree'];
  // const randomPix = Math.floor(Math.random() * 3);

  // let picturePicker: string[] = [];

  // switch (routePath) {
  //   case 'Artists':
  //     picturePicker = artistsName;
  //     break;
  //   case 'Albums':
  //     picturePicker = albumName;
  //     break;
  //   default:
  //     break;
  // }
  const history = useHistory();
  const clickHandler = (event: any) => {
    console.log(event);
    history.push(`../playlist/${props.id}`);
  };
  return (
    <div className={classes['library-wrapper']}>
      <div className={classes['library-image-card']} onClick={clickHandler}>
        <img
          className={`${classes['library-img']} ${routePath === 'Artists' ? classes['img-circle'] : ''}`}
          src={routePath === 'Artists' || routePath === 'Albums' ? props.image : Avatar}
          alt='avatar'
        />
      </div>
      <div className={`${classes['library-card-desc']} ${routePath === 'Artists' ? classes['desc-center'] : ''}`}>
        <h3>{props.name}</h3>
        <small>{props.description}</small>
      </div>
    </div>
  );
};
export default LibraryList;
