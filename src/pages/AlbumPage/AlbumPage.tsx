import React, { useState, useContext } from 'react';
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
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { secondsToHms } from '../../utils/utils';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import { useFetch } from '../../utils/utils';
import { AuthContext } from '../../context/AuthContext';

const AlbumPage = () => {
  const classes = albumMaterialStyles();
  const [expanded, setExpanded] = useState({ panel1: true, panel2: true });
  const { id } = useParams<{ id?: string }>();
  const { user } = useContext(AuthContext);
  // const userId = user.user._id;

  const token = user.token;

  const { isLoading, data: album, error } = useFetch('album-page', `/album?album=${id}`, token);

  return (
    <div className={styles.albumPage}>
      {error && <h1>An error occurred, pls try again...</h1>}
      {isLoading && !error && (
        <div className={styles.albumLoaderContainer}>
          <Loader type='Oval' color='#FFFFFF' height={50} width={50} />
        </div>
      )}
      {album && album.result.length !== 0 && (
        <>
          <div className={classes.mobileNavIconsBox}>
            <ArrowBackIcon className={classes.iconFlex} />
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
                <MdFavoriteBorder className={[styles.albumActionIcon, styles.albumLoveIcon].join(' ')} />
                <RiMoreLine className={[styles.albumActionIcon, styles.albumMoreIcon].join(' ')} />
              </div>
              <p className={styles.albumDate}>RELEASE DATE: 23.10.1995</p>
            </div>
          </div>
          <div className={styles.mobileBtn}>
            <Button
              variant='outlined'
              className={clsx(classes.outlinedBtn, classes.materialBtn)}
              startIcon={<FavoriteBorderIcon />}
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
                  <TracksTable tracks={album.result.tracks} />
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
                <AlbumCard key={album.id} album={album} artistName={album.result ? album.result.artist.name : ''} />
              ))}
            </div>
          </div>{' '}
        </>
      )}
    </div>
  );
};

export default AlbumPage;
