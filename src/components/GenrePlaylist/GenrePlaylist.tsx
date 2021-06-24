import React from 'react';
import genrePlaylist from './GenrePlaylist.module.css';
import { FcLike } from 'react-icons/fc';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosMusicalNotes } from 'react-icons/io';

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
              <div key={playlist._id} className={genrePlaylist.playlistDiv}>
                <div className={genrePlaylist.playlistDiv}>
                  <div className={genrePlaylist.playlistCard}>
                    <div>{playlist.name}</div>
                    <div className={genrePlaylist.noPlaylistPlus}>
                        <IoIosMusicalNotes />
                    </div>
                  </div>
                  <div className={genrePlaylist.playlistName}>{playlist.name}</div>
                  <div className={genrePlaylist.playlistLikes}>
                    <FcLike /> {playlist.likesCount}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={genrePlaylist.noPlaylistDiv}>
            <div className={genrePlaylist.noPlaylistCard}>
              <div className={genrePlaylist.noPlaylistPlus}>
                <AiOutlinePlus />
              </div>
              <div>Add playlist</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePlaylist;
