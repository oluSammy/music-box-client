import React, { useState, useEffect } from 'react';
import styles from '../AlbumPage/albumPage.module.css';
import { RiMoreLine } from 'react-icons/ri';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import albumMaterialStyles from '../AlbumPage/albumPageStyles';
import clsx from 'clsx';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from "react-loader-spinner";
import { secondsToHms } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlaylistTable from '../../components/PlaylistTable/PlaylistTable';
import RecommendedSongs from '../../components/RecomendedSongs/RecomendedSongs';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';

const PlaylistPage = () => {
  const classes = albumMaterialStyles();
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
          <h3 className={styles.albumName}>Created Playlist</h3>
          <h2 className={styles.albumTitle}>{album.title}</h2>
          <p className={clsx(styles.albumSubtitle, classes.albumDescNone)}>
            <StarIcon className={styles.albumStar} />
            No description
          </p>
          <p className={clsx(classes.playlistTimeMobile,)}>
            <p>{album.nb_tracks} songs, &nbsp;</p>
            <p> {secondsToHms(album.duration)}</p>
          </p>
          <div className={styles.albumNumbers}>
            <p>{album.nb_tracks} songs, &nbsp;</p>
            <p> {secondsToHms(album.duration)}</p>
          </div>
        </div>
        <div className={styles.albumRight}>
          <div className={styles.albumActions}>
            <button className={styles.albumBtn}>SHUFFLE PLAY</button>
            <Button variant="outlined" className={classes.editBtn}>Edit</Button>
            <RiMoreLine className={[styles.albumActionIcon, styles.albumMoreIcon].join(' ')} />
          </div>
          <p className={styles.albumDate}>CREATED: 23.10.1995</p>
        </div>
      </div>
      <div className={styles.mobileBtn}>
        <Button variant="outlined"
          className={clsx(classes.outlinedBtn, classes.materialBtn)}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        <Button variant="contained"
          className={clsx(classes.containedBtn, classes.materialBtn)}
          startIcon={<PlayArrowIcon />}
        >
          Shuffle PLAY
        </Button>
      </div>
      <p className={classes.playlistDescription}>No description</p>
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
      <div className={classes.tableHeading}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchOutlinedIcon />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="playlist search"
              className={classes.textField}
              InputLabelProps={{
                className: classes.labelWhite
              }}
              InputProps={{
                className: classes.labelWhite
              }}
            />
          </Grid>
        </Grid>
        <p className={classes.playlistTitle}>
          <span className={classes.playlistSongs}>Playlist Songs</span>
          <span><ExpandMoreIcon className={classes.expandIcon} /></span>
        </p>
      </div>
      <PlaylistTable />
      <RecommendedSongs />
      </>}
    </div>
  )
}

export default PlaylistPage
