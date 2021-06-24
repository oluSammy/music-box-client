import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import artistgenreStyle from './GenreArtist.module.css';
import { FcLike } from 'react-icons/fc';
import axios from 'axios';

interface Artist {
  id: number;
  name: string;
}

interface Props {
  id?: number;
  artistes: any[];
  showHidden: (a:string)=>void;
}
const GenreArtist: React.FC<Props> = (props) => {
  const [artist, setArtist] = useState({} as Artist)
  const history = useHistory();
  const { _id } = useParams<{ _id: string }>();

  const selectArtist = (id: string) => {
      history.push(`/artist/${id}`)
  }

  useEffect(() => {
    const fetchArtist = async () => {
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/artist/${_id}`);
      setArtist(data);
    };
    fetchArtist();
  }, [_id]);
  console.log(artist)
  return (
    <div >
      <div className={artistgenreStyle.section}>
        <h4 className={artistgenreStyle.left}>Artists</h4>
        <p className={artistgenreStyle.right} onClick={()=> props.showHidden("artists")}>view all</p>
      </div>
      <div className={artistgenreStyle.artistFlex}>
        {props.artistes.slice(0,7).map((artiste) => {
          return (
            <div key={artiste.id} className={artistgenreStyle.artistDiv}>
              <img src={artiste.picture} className={artistgenreStyle.artistImage} alt='' onClick={() => selectArtist(_id)}/>
              <div className={artistgenreStyle.artistName}>{artiste.name}</div>
              <div className={artistgenreStyle.artistLikes}><FcLike/> 23,594</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenreArtist;
