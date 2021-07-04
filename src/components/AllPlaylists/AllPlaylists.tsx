import React from 'react';
import AllPlaylistStyles from './AllPlaylists.module.css';
import { FcLike } from 'react-icons/fc';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { IoIosMusicalNotes } from 'react-icons/io';
import { IconContext } from 'react-icons';

interface Props {
  playlists: any[];
}

const AllPlaylists: React.FC<Props> = (props) => {
  return (
    <div>
      <div className={AllPlaylistStyles.section}>
        <h4 className={AllPlaylistStyles.left}>Playlists</h4>
      </div>
      <div className={AllPlaylistStyles.playlistFlex}>
        {props.playlists.length ? (
          props.playlists.map((playlist) => {
            return (
              <div key={playlist._id} className={AllPlaylistStyles.playlistDiv}>
                <div className={AllPlaylistStyles.playlistDiv}>
                  <div className={AllPlaylistStyles.playlistCard}>
                    <div>{playlist.name}</div>
                    <div className={AllPlaylistStyles.noPlaylistPlus}>
                      <IoIosMusicalNotes />
                    </div>
                  </div>
                  <div className={AllPlaylistStyles.playlistName}>{playlist.name}</div>
                  <div className={AllPlaylistStyles.playlistLikes}>
                    <FcLike /> {playlist.likesCount}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={AllPlaylistStyles.noPlaylistDiv}>
            <div className={AllPlaylistStyles.noPlaylistCard}>
              <div className={AllPlaylistStyles.noPlaylistPlus}>
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

export default AllPlaylists;
