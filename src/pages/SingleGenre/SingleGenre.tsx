import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import singleGenreStyles from './SingleGenre.module.css';
import GenreArtist from '../../components/GenreArtist/GenreArtist';
import AllArtists from '../../components/AllArtists/AllArtists';
import AllPlaylists from '../../components/AllPlaylists/AllPlaylists';
import GenrePlaylist from '../../components/GenrePlaylist/GenrePlaylist';
import PopularGenre from '../../components/PopularGenre/PopularGenre';
import NewReleaseGenre from '../../components/NewReleaseGenre/NewReleaseGenre'
import { RiArrowLeftLine } from 'react-icons/ri';
import axios from 'axios';

interface Genre {
    genreId: number;
    id: number;
    name: string;
    picture_xl: string;
  }

const SingleGenre = () => {
  const [artistes, setArtistes] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [genre, setGenre] = useState({} as Genre);
  const [show, setShow] = useState('overview');
  const { playlistId } = useParams<{ playlistId: string }>();
  const { genreId } = useParams<{ genreId: string }>();
  const history = useHistory();

  const goBack = () => {
    history.push(`/genres`)
}

  useEffect(() => {
    const fetchArtistes = async () => {
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/genres/artist/${genreId}`);
      setArtistes(data);
    };
    const fetchPlaylists = async () => {
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/genres/playlist/${playlistId}`);
      setPlaylists(data);
    };
    const fetchGenre = async () => {
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/genres/${genreId}`);
      setGenre(data);
    };
    fetchGenre();
    fetchPlaylists();
    fetchArtistes();
  }, [genreId, playlistId]);
  const showHidden = (category:string) => {
    setShow(category);
  }
  return (
    <div className={singleGenreStyles.singleGenreBody} style={{position: "relative"}}>
    {/* <div className={singleGenreStyles.singleGenreBackground} style={{ background: `url(${genre.picture_xl})no-repeat 100% 100%/cover`, position: "absolute", top: 0, left: 0, width: "100%", backdropFilter: "blur(10px)" }}>
        <div style={{height: "100%", width:"100%", background: "rgba(0, 0, 0, .2)", backdropFilter: "blur(10px)"}}></div>
    </div> */}
      <div className={singleGenreStyles.back} onClick={goBack}>
        <RiArrowLeftLine /> Back
      </div>
      <div className={singleGenreStyles.nav}>
        <div className={singleGenreStyles.navGenre}>{genre.name}</div>
        <div className={singleGenreStyles.innerNav}>
          <div className={singleGenreStyles.navItem} onClick={()=> showHidden("overview")}>overview</div>
          <div className={singleGenreStyles.navItem} onClick={()=> showHidden("playlists")}>playlists</div>
          <div className={singleGenreStyles.navItem}>new releases</div>
          <div className={singleGenreStyles.navItem} onClick={()=> showHidden("artists")}>artists</div>
        </div>
      </div>
    {show === "overview" && <> <PopularGenre /> 
      <GenrePlaylist playlists={playlists} showHidden={showHidden}/>
      <NewReleaseGenre />
      <GenreArtist artistes={artistes} showHidden={showHidden}/>
      </>}
      {show === "artists" && <AllArtists artistes={artistes} />}
      {show === "playlists" && <AllPlaylists playlists={playlists} />}
    </div>
  );
};

export default SingleGenre;
