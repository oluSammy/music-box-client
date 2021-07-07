import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
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
import useMusicPlayer from '../../hooks/useMusicPlayer';

interface Artist {
  id?: number;
  name: string;
  picture: string;
  picture_xl: string;
}

const SIngleArtist = () => {
  const ctx = useContext(AuthContext);
  const { token } = ctx.user;
  const { setArtistName } = ctx;
  const [artist, setArtist] = useState({} as Artist);
  const [tracks, setTracks] = useState<any[]>([]);
  const [albums, setAlbums] = useState([]);
  const { handleSongClick, handleShuffle } = useMusicPlayer();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    try {
      // const fetchArtist = async () => {
      //   const {
      //     data: {data}
      //   } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/artist/${id}`, {
      //     headers: {
      //       Authorization: token
      //     }
      //   });
      //   console.log('data ***', data);
      //   setArtist(data);
      // };
      const fetchArtist = async () => {
        const { data } = await axios.get(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/artist/${id}`);
        console.log('data ***', data);
        setArtist(data);
        setArtistName(`${data.name}-${id}`);
      };
      console.log('id', id);
      const fetchTracks = async () => {
        const {
          data: { data },
        } = await axios.get(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/artist/${id}/top`);
        setTracks(data);
      };
      const fetchAlbums = async () => {
        const {
          data: { data },
        } = await axios.get(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/artist/${id}/albums`);
        setAlbums(data);
      };
      fetchArtist();
      fetchTracks();
      fetchAlbums();
    } catch (error) {
      console.log(error);
    }
  }, [id, token, setArtistName]);

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
              <button
                className={artistStyles.shuffleButton2}
                onClick={() => {
                  handleSongClick(tracks[0].id, tracks);
                  handleShuffle();
                  console.log('clicked');
                }}
              >
                <ShuffleIcon style={{ fontSize: 'medium' }} /> shuffle play
              </button>
            </div>
            <div className={artistStyles.nav}>
              <div className={artistStyles.navItem}>overview</div>
              <div className={artistStyles.navItem}>
                <a href='#album'>albums</a>
              </div>
              <div className={artistStyles.navItem}>fans also like</div>
            </div>
          </div>
        </div>
        <div className={artistStyles.right}>
          <button
            className={artistStyles.shuffleButton}
            onClick={() => {
              handleSongClick(tracks[0].id, tracks);
              handleShuffle();
              console.log('clicked');
            }}
          >
            shuffle play
          </button>
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
