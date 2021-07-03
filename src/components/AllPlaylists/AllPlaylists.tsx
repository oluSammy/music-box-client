import React from 'react';
import AllPlaylistStyles from './AllPlaylists.module.css';
import { FcLike } from 'react-icons/fc';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosMusicalNotes } from 'react-icons/io';

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

export default AllPlaylists;
