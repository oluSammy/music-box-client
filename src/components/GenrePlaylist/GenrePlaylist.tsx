import React from 'react';
import genrePlaylist from './GenrePlaylist.module.css';
import { FcLike } from 'react-icons/fc';
import { BsFillPlusCircleFill } from 'react-icons/bs';
// import { IoIosMusicalNotes } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

interface Props {
  playlists: any[];
  showHidden: (a: string) => void;
}

const GenrePlaylist: React.FC<Props> = (props) => {
  return (
    <div>
      <div className={genrePlaylist.section}>
        <h4 className={genrePlaylist.left}>Playlists</h4>
        <p className={genrePlaylist.right} onClick={() => props.showHidden('playlists')}>
          view all
        </p>
      </div>
      <div className={genrePlaylist.playlistFlex}>
        {props.playlists.length ? (
          props.playlists.slice(0, 7).map((playlist) => {
            return (
              <Link to={`/playlist/${playlist._id}`} className={genrePlaylist.playlistLink}>
                <div key={playlist._id} className={genrePlaylist.playlistDiv}>
                  <img src={playlist.imgURL} className={genrePlaylist.playlistImage} alt='' />
                  <div className={genrePlaylist.playlistName}>{playlist.name}</div>
                  <div className={genrePlaylist.playlistLikes}>
                    <FcLike /> {playlist.likesCount}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className={genrePlaylist.noPlaylistDiv}>
            <div className={genrePlaylist.noPlaylistCard}>
              <div>
                <IconContext.Provider value={{ color: '#2DCEEF', size: '30px' }}>
                  <BsFillPlusCircleFill />
                </IconContext.Provider>
              </div>
              <div>Create Playlist</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePlaylist;
