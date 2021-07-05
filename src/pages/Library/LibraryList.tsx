import React from 'react';
import classes from './LibraryList.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import getImageByKey from '../../utils/getImageByKey';
import LikedAvatar from '../../assets/library/liked.png';

interface Props {
  //declare props here
  name?: string;
  description?: string;
  key?: any;
  id?: string;
  image?: string;
  playlistType?: string;
  noOfTracks?: boolean;
}
const LibraryList = (props: Props) => {
  const { pathname } = useLocation();
  let routePath = '';
  const path = pathname.split('/')[2];
  if (path === 'playlist') routePath = 'Playlists';
  if (path === 'album') routePath = 'Albums';
  if (path === 'artist') routePath = 'Artists';

  let picturePicker: string | undefined = '';
  const history = useHistory();
  const clickHandler = (event: any) => {
    history.push(`../${path}/${props.id}`);
  };

  let playlistPic = '';

  if (props.playlistType === 'owner' && props.noOfTracks) {
    playlistPic = getImageByKey('owner');
  } else if (props.playlistType === 'owner' && !props.noOfTracks) {
    playlistPic = props.image as string;
  } else {
    playlistPic = LikedAvatar;
  }

  switch (routePath) {
    case 'Artists':
      picturePicker = props.image;
      break;
    case 'Albums':
      picturePicker = props.image;
      break;
    default:
      picturePicker = playlistPic;
      break;
  }
  return (
    <div className={classes['library-wrapper']} onClick={clickHandler}>
      <div>
        <div
          className={classes['library-image-card']}
          style={{ margin: routePath === 'Artists' ? '0 auto' : undefined }}
        >
          <div
            className={`${classes['library-img']} ${routePath === 'Artists' ? classes['img-circle'] : ''}`}
            style={{ backgroundImage: `url(${picturePicker})`, backgroundSize: 'cover' }}
          ></div>
        </div>
        <div className={`${classes['library-card-desc']} ${routePath === 'Artists' ? classes['desc-center'] : ''}`}>
          <h5>{props.name}</h5>
          <div className={classes.artistLikes}>
            <span style={{ fontWeight: 300 }}>{props.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LibraryList;
