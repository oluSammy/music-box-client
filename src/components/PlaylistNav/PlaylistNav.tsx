import React from 'react';
import { NavLink } from 'react-router-dom';
import playlistScss from './PlaylistNav.module.scss';
import { PlaylistMenu } from './PlaylistMenu';

interface PlayTypes {
  name: string;
  path: string;
  cRoute: string;
}
function PlaylistNav() {
  return (
    <div className={playlistScss.allRoute}>
      {PlaylistMenu.map((item: PlayTypes) => (
        <div className={playlistScss.browse_route}>
          <NavLink
            activeClassName={playlistScss.navList}
            to={item.path}
            exact
            style={{ color: item.name === 'Playlist' ? '#fff' : '#99999f' }}
          >
            {item.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default PlaylistNav;
