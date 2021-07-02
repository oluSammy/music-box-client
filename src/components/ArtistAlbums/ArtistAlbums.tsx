import React from 'react';
import ArtistAlbumStyles from './ArtistAlbums.module.css';
// import vImg from '../../asset/genres/v-img.png';

interface Props {
  albums: any[];
}

const ArtistAlbums: React.FC<Props> = (props) => {
  return (
    <div className={ArtistAlbumStyles.albums}>
      <h4 className={ArtistAlbumStyles.left}>Albums</h4>
      <p className={ArtistAlbumStyles.right}>view all</p>
      <div className={ArtistAlbumStyles.singleGenreGrid}>
        {props.albums.slice(0, 14).map((album) => (
          <div key={album.id} className={ArtistAlbumStyles.singleGenreDiv}>
            <div
              className={ArtistAlbumStyles.singleGenreCard}
              style={{ background: `url(${album.cover}) no-repeat 100% 100%/cover` }}
            ></div>
            <div className={ArtistAlbumStyles.name}>{album.title}</div>
            <p className={ArtistAlbumStyles.about}>Released: {album.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistAlbums;
