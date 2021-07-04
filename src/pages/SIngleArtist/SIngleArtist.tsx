import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import artistStyles from './SIngleArtist.module.css';
import { RiMoreLine } from 'react-icons/ri';
import ArtistAlbums from '../../components/ArtistAlbums/ArtistAlbums';
import ArtistPopularSongs from '../../components/ArtistPopularSongs/ArtistPopularSongs';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { MdFavoriteBorder } from 'react-icons/md';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface Artist {
  id?: number;
  name: string;
  picture: string;
  picture_xl: string;
}

const SIngleArtist = () => {
  const [artist, setArtist] = useState({} as Artist);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchArtist = async () => {
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/artist/${id}`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGM4MzFhOWY3ZTllMDAxNTRkYmZlNiIsImlhdCI6MTYyNTE1NTc1OCwiZXhwIjoxNjI1MzI4NTU4fQ.90fjGvbErdlxxFB50NUcOQnImNv60vjhxoxpqOakoJ4',
        },
      });
      console.log('data ***', data);
      setArtist(data);
    };
    console.log('id', id);
    const fetchTracks = async () => {
      const {
        data: { data },
      } = await axios.get(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/artist/${id}/top`);
      console.log('tracks', data);
      setTracks(data);
    };
    const fetchAlbums = async () => {
      const {
        data: { data },
      } = await axios.get(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/artist/${id}/albums`);
      console.log('albums', data);
      setAlbums(data);
    };
    fetchArtist();
    fetchTracks();
    fetchAlbums();
  }, [id]);

  console.log('ARTISTE', artist);
  console.log('TRACKS', tracks);
  return (
    <div className={artistStyles.artistBody}>
      <div className={artistStyles.mobileIcons}>
        <div>
          <ArrowBackIcon />
        </div>
        <div className={artistStyles.right}>
          <ShareIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div className={artistStyles.artistGrid}>
        <div className={artistStyles.artistFlex}>
          <div>
            <img src={artist.picture} className={artistStyles.artistImage} alt='' />
          </div>
          <div className={artistStyles.artistDets}>
            <p className={artistStyles.artistTitle}>Artist</p>
            <div className={artistStyles.artistName}>{artist.name}</div>
            <div className={artistStyles.buttons}>
              <button className={artistStyles.followButton}>
                <span>
                  <FavoriteBorderIcon style={{ fontSize: 'medium' }} />
                </span>{' '}
                <span>Follow</span>
              </button>
              <button className={artistStyles.shuffleButton2}>
                <ShuffleIcon style={{ fontSize: 'medium' }} /> shuffle play
              </button>
            </div>
            <div className={artistStyles.nav}>
              <div className={artistStyles.navItem}>overview</div>
              <div className={artistStyles.navItem}>about</div>
              <div className={artistStyles.navItem}>fans also like</div>
            </div>
          </div>
        </div>
        <div className={artistStyles.right}>
          <button className={artistStyles.shuffleButton}>shuffle play</button>
          <span className={artistStyles.icons}>
            <MdFavoriteBorder />
          </span>
          <span className={artistStyles.icons}>
            <RiMoreLine />
          </span>
        </div>
      </div>
      <ArtistPopularSongs tracks={tracks} />
      <ArtistAlbums albums={albums} />
    </div>
  );
};

export default SIngleArtist;
