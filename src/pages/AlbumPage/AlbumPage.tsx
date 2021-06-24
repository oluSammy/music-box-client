import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from "react-loader-spinner";
import { secondsToHms } from '../../utils/utils';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';

const AlbumPage = () => {
  const classes = albumMaterialStyles();

  // accordion state
  const [expanded, setExpanded] = useState({panel1: true, panel2: true});
  const { id } = useParams<{id?: string}>();
  const [album, setAlbum] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchAlbum = async () => {

      try {
        const {data: {data}} = await axios({
          method: 'get',
          url: `https://music-box-b.herokuapp.com/api/v1/music-box-api/album?album=${id}`,
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwY2IzYjdjZDc4OGM4MDAxNTI3YjE5NiIsImlhdCI6MTYyNDMzMTgxMywiZXhwIjoxNjI0NTA0NjEzfQ.7SSupx4uJkAbG522JvAD-hUbSwwQRH7O6P6W87fZUOE`,
          },
        })
        setAlbum(data);
        console.log(data);
        setLoading(false)

      } catch(e) {
        setError(e)
      }
    }

    fetchAlbum()
  }, [id]);


  return (
    <div className={styles.albumPage}>
      {error && <h1>loading...</h1>}
      {loading && <div className={styles.albumLoaderContainer}>
        <Loader
          type="Oval"
          color="#FFFFFF"
          height={50}
          width={50}
        />
      </div>}
      {album.length !== 0 && <>
      <div className={classes.mobileNavIconsBox}>
        <ArrowBackIcon className={classes.iconFlex} />
        <ShareIcon className={classes.iconMarginRight} />
        <MoreVertIcon />
      </div>
      <div className={styles.albumTop}>
        <figure className={styles.albumImgContainer}>
          <img src={album.cover_medium} className={styles.albumImg} alt="album cover" />
        </figure>
        <div className={styles.albumDetails}>
          <h3 className={styles.albumName}>Album</h3>
          <h2 className={styles.albumTitle}>{album.title}</h2>
          <p className={styles.albumSubtitle}>
            <StarIcon className={styles.albumStar} />
            {album.artist && album.artist.name}
          </p>
          <div className={styles.albumNumbers}>
            <p>{album.nb_tracks} songs, &nbsp;</p>
            <p> {secondsToHms(album.duration)}</p>
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
        <Button variant="outlined"
          className={clsx(classes.outlinedBtn, classes.materialBtn)}
          startIcon={<FavoriteBorderIcon />}
        >
          ADD ALBUM
        </Button>
        <Button variant="contained"
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
            onChange={() => {setExpanded({ panel1: !expanded.panel1, panel2: expanded.panel2 })}}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={classes.accordionExpand} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className={classes.accordionHeading}>
                <AdjustIcon className={classes.accordionTitleIcon} />
                <span className={classes.accordionTitleText}>1 SIDE</span>
                <p className={classes.albumSongs}>Album Songs</p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <TracksTable tracks={album.tracks} />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className={classes.more} >
        <div className={classes.moreHeading}>
          <h6 className={classes.moreHeadingText}>More by The Smashing Pumpkins</h6>
          <p className={classes.view}>VIEW ALL</p>
        </div>
        <div className={classes.moreContainer}>
          <AlbumCard />
          <AlbumCard />
          <AlbumCard />
          <AlbumCard />
          <AlbumCard />
          <AlbumCard />
        </div>
      </div> </>
      }
    </div>
  )
}

export default AlbumPage
