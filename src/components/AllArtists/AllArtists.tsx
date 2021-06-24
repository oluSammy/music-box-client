import React from 'react';
import allArtistsStyles from "./AllArtists.module.css";
import { FcLike } from 'react-icons/fc';

interface Props {
    artistes: any[];
  }

const AllArtists: React.FC<Props> = (props) => {
    return (
        <div>
             <div className={allArtistsStyles.section}>
        <h4 className={allArtistsStyles.left}>Artists</h4>
      </div>
      <div className={allArtistsStyles.artistFlex}>
        {props.artistes.map((artiste) => {
          return (
            <div key={artiste.id} className={allArtistsStyles.artistDiv}>
              <img src={artiste.picture} className={allArtistsStyles.artistImage} alt='' />
              <div className={allArtistsStyles.artistName}>{artiste.name}</div>
              <div className={allArtistsStyles.artistLikes}><FcLike/> 23,594</div>
            </div>
          );
        })}
      </div>
        </div>
    )
}

export default AllArtists
