import React from 'react';
import { NavLink } from "react-router-dom";
import playistScss from "./PlaylistNav.module.scss";
import { PlaylistMenu } from "./PlaylistMenu"

interface PlayTypes {
  name: string;
  path: string;
  cRoute:string;
}
function PlaylistNav() {
    return (
      <div>
        {PlaylistMenu.map((item:PlayTypes) => (
          <div className={playistScss.browse_route}>
            <NavLink activeClassName={playistScss.genre} to='#/' exact>
              item.name
            </NavLink>
          </div>
        ))}
      </div>
    );
}

export default PlaylistNav;
