import React from 'react';
import { useHistory } from 'react-router-dom';
import artistgenreStyle from './GenreArtist.module.css';

interface Props {
  id?: number;
  artistes: any[];
  showHidden: (a: string) => void;
}
const GenreArtist: React.FC<Props> = (props) => {
  const history = useHistory();
  const selectArtist = (id: string) => {
    history.push(`/artist/${id}`);
  };

  return (
    <div>
      <div className={artistgenreStyle.section}>
        <h4 className={artistgenreStyle.left}>Artists</h4>
        <p className={artistgenreStyle.right} onClick={() => props.showHidden('artists')}>
          view all
        </p>
      </div>
      <div className={artistgenreStyle.artistFlex}>
        {props.artistes.slice(0, 7).map((artiste) => {
          return (
            <div key={artiste.id} className={artistgenreStyle.artistDiv} onClick={() => selectArtist(artiste.id)}>
              <img src={artiste.picture} className={artistgenreStyle.artistImage} alt='' />
              <div className={artistgenreStyle.artistName}>{artiste.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenreArtist;
