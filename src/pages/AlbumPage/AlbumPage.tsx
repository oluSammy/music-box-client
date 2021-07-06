import React, { useState, useContext, useEffect } from 'react';
import styles from './albumPage.module.css';
import { RiMoreLine } from 'react-icons/ri';
import { MdFavoriteBorder } from 'react-icons/md';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import albumMaterialStyles from './albumPageStyles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AdjustIcon from '@material-ui/icons/Adjust';
import TracksTable from '../../components/TracksTable/TracksTable.component';
import Switch from '@material-ui/core/Switch';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import { useParams, useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { secondsToHms } from '../../utils/utils';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import IconButton from '@material-ui/core/IconButton';

const AlbumPage = () => {
  const classes = albumMaterialStyles();
  const [expanded, setExpanded] = useState({ panel1: true, panel2: true });
  const { id } = useParams<{ id?: string }>();
  const [urlId, seturlId] = useState(id)
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [album, setAlbum] = useState<any>(null);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const token = user.token;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios({
        method: 'get',
        url: `https://music-box-b.herokuapp.com/api/v1/music-box-api/album?album=${urlId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlbum(response.data.data);
      setIsLoading(false);
      const hasBeenLiked = response.data.data.result.likes.includes(user.data._id);

      if (hasBeenLiked) {
        setIsLiked(true);
      }
    };
    try {
      fetchData();
    } catch (e) {
      setIsLoading(false);
      setError(e.response);
    }
  }, [urlId, token, user]);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    try {
      const data = await axios({
        method: 'put',
        url: `https://music-box-b.herokuapp.com/api/v1/music-box-api/album/likes/${album.result._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data);
    } catch (e) {}
  };

  return (
    <div className={styles.albumPage}>
      {error && <h1>An error occurred, pls try again...</h1>}
      {isLoading && !error && (
        <div className={styles.albumLoaderContainer}>
          <Loader type='Oval' color='#FFFFFF' height={50} width={50} />
        </div>
      )}
      {album && album.result.length !== 0 && !isLoading && (
        <>
          <div className={classes.mobileNavIconsBox}>
            <IconButton style={{ color: '#FFFFFF', marginRight: 'auto' }}>
              <ArrowBackIcon className={classes.iconFlex} onClick={() => history.goBack()} />
            </IconButton>
            <ShareIcon className={classes.iconMarginRight} />
            <MoreVertIcon />
          </div>
          <div className={styles.albumTop}>
            <figure className={styles.albumImgContainer}>
              <img src={album.result.cover_medium} className={styles.albumImg} alt='album cover' />
            </figure>
            <div className={styles.albumDetails}>
              <h3 className={styles.albumName}>Album</h3>
              <h2 className={styles.albumTitle}>{album.result.title}</h2>
              <p className={styles.albumSubtitle}>
                <StarIcon className={styles.albumStar} />
                {album.result.artist && album.result.artist.name}
              </p>
              <div className={styles.albumNumbers}>
                <p>{album.result.nb_tracks} songs, &nbsp;</p>
                <p> {secondsToHms(album.result.duration)}</p>
              </div>
            </div>
            <div className={styles.albumRight}>
              <div className={styles.albumActions}>
                <button className={styles.albumBtn}>Play</button>
                <MdFavoriteBorder
                  onClick={handleLike}
                  style={{ fill: isLiked ? 'red' : 'white', border: isLiked ? '1px solid red' : '1px solid white' }}
                  className={[styles.albumActionIcon, styles.albumLoveIcon].join(' ')}
                />
                <RiMoreLine className={[styles.albumActionIcon, styles.albumMoreIcon].join(' ')} />
              </div>
              <p className={styles.albumDate}>
                RELEASE DATE:{' '}
                {new Date(album.result.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className={styles.mobileBtn}>
            <Button
              variant='outlined'
              className={clsx(classes.materialBtn)}
              startIcon={<FavoriteBorderIcon />}
              onClick={handleLike}
              style={{
                color: isLiked ? 'orangered' : '#FFFFFF',
                border: isLiked ? '1px solid orangered' : '1px solid #FFFFFF',
              }}
            >
              ADD ALBUM
            </Button>
            <Button
              variant='contained'
              className={clsx(classes.containedBtn, classes.materialBtn)}
              startIcon={<PlayArrowIcon />}
            >
              PLAY
            </Button>
          </div>
          <div className={classes.downloadBtn}>
            <p className={classes.downloadTxt}>DOWNLOAD</p>
            <Switch
              disableRipple
              classes={{
                switchBase: classes.switchBase,
                checked: classes.checked,
              }}
            />
          </div>
          <div className={classes.accordionWrapper}>
            <div className={classes.accContainer}>
              <Accordion
                expanded={expanded.panel1}
                className={classes.accordion}
                onChange={() => {
                  setExpanded({ panel1: !expanded.panel1, panel2: expanded.panel2 });
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={classes.accordionExpand} />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <div className={classes.accordionHeading}>
                    <AdjustIcon className={classes.accordionTitleIcon} />
                    <span className={classes.accordionTitleText}>1 SIDE</span>
                    <p className={classes.albumSongs}>Album Songs</p>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <TracksTable
                    tracks={album.result.tracks}
                    img={album.result.cover_medium}
                    album={album.result.title}
                  />
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div className={classes.more}>
            <div className={classes.moreHeading}>
              <h6 className={classes.moreHeadingText}>More by {album.result.artist && album.result.artist.name}</h6>
              <p className={classes.view}>VIEW ALL</p>
            </div>
            <div className={classes.moreContainer}>
              {album.moreAlbum.map((album: any) => (
                <AlbumCard key={album.id} seturlId={seturlId} album={album} artistName={album.result ? album.result.artist.name : ''} />
              ))}
            </div>
          </div>{' '}
        </>
      )}
    </div>
  );
};

export default AlbumPage;
