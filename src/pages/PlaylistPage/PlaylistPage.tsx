import React, { useEffect, useContext } from 'react';
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
import Loader from 'react-loader-spinner';
import { secondsToHms } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlaylistTable from '../../components/PlaylistTable/PlaylistTable';
// import RecommendedSongs from '../../components/RecomendedSongs/RecomendedSongs';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import { useFetch } from '../../utils/utils';
import playlistCover from '../../assets/playlistCover.png';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import { AuthContext } from '../../context/AuthContext';

const PlaylistPage = () => {
  const classes = albumMaterialStyles();
  const { id: urlParams } = useParams<{ id?: string }>();
  const [filterTxt, setFilterTxt] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  const [isRemovingSong, setIsRemovingSong] = React.useState(false);
  const [tracks, setTracks] = React.useState([]);
  const { user } = useContext(AuthContext);
  const userId = user.user._id;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = user.token

  const { isLoading, data: playlist, error } = useFetch('album-page', `/playlist/${urlParams}`, token);

  useEffect(() => {
    if (playlist) {
      setTracks(playlist.payload.tracks);
      // console.log(playlist.payload.ownerId);
      console.log(playlist);
    }
  }, [playlist]);

  const removeSong = async (id: string) => {
    try {
      setIsRemovingSong(true);
      const {
        data: {
          data: { payload },
        },
      } = await axios({
        method: 'delete',
        url: `https://music-box-b.herokuapp.com/api/v1/music-box-api/playlist/${urlParams}`,
        data: {
          id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTracks(payload.tracks);
      setIsRemovingSong(false);
    } catch (e) {
      setIsRemovingSong(false);
    }
  };

  return (
    <div className={styles.albumPage}>
      {error && <h1>An error occured, pls try again...</h1>}
      {isLoading && (
        <div className={styles.albumLoaderContainer}>
          <Loader type='Oval' color='#FFFFFF' height={50} width={50} />
        </div>
      )}

      {playlist && (
        <>
          <div className={classes.mobileNavIconsBox}>
            <ArrowBackIcon className={classes.iconFlex} />
            <ShareIcon className={classes.iconMarginRight} />
            <MoreVertIcon />
          </div>
          <div className={styles.albumTop}>
            <figure className={styles.albumImgContainer}>
              <img src={playlistCover} className={styles.albumImg} alt='playlist cover' />
            </figure>
            <div className={styles.albumDetails}>
              <h3 className={styles.albumName}>Created Playlist</h3>
              <h2 className={styles.albumTitle}>{playlist.payload.name}</h2>
              <p className={clsx(styles.albumSubtitle, classes.albumDescNone)}>
                <StarIcon className={styles.albumStar} />
                No description
              </p>
              <p className={clsx(classes.playlistTimeMobile)}>
                <span>{playlist.payload.tracks.length} songs, &nbsp;</span>
                <span>
                  {' '}
                  {secondsToHms(
                    playlist.payload.tracks.reduce((acc: number, track: any) => {
                      return acc + Number(track.duration);
                    }, 0)
                  )}
                </span>
              </p>
              <div className={styles.albumNumbers}>
                <span>{playlist.payload.tracks.length} songs, &nbsp;</span>
                <span>
                  {' '}
                  {secondsToHms(
                    playlist.payload.tracks.reduce((acc: number, track: any) => {
                      return acc + Number(track.duration);
                    }, 0)
                  )}
                </span>
              </div>
            </div>
            <div className={styles.albumRight}>
              <div className={styles.albumActions}>
                <button className={styles.albumBtn}>SHUFFLE PLAY</button>
                {userId === playlist.payload.ownerId && (
                  <Button variant='outlined' className={classes.editBtn} onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Done' : 'Edit'}
                  </Button>
                )}
                <RiMoreLine className={[styles.albumActionIcon, styles.albumMoreIcon].join(' ')} />
              </div>
              <p className={styles.albumDate}>
                CREATED: &nbsp;
                {new Date(playlist.payload.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className={styles.mobileBtn}>
            {userId === playlist.payload.ownerId && (
              <Button
                variant='outlined'
                className={clsx(classes.outlinedBtn, classes.materialBtn)}
                startIcon={isEditing ? <DoneAllOutlinedIcon /> : <EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Done' : 'Edit'}
              </Button>
            )}
            <Button
              variant='contained'
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
          {isEditing && (
            <div className={classes.addBtnBox}>
              <Button
                variant='contained'
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
                className={clsx(classes.containedBtn, classes.addBtn)}
                startIcon={<PlaylistAddOutlinedIcon />}
              >
                Add Songs to playlist
              </Button>
            </div>
          )}
          <div className={classes.tableHeading}>
            <Grid container spacing={1} alignItems='flex-end'>
              <Grid item>
                <SearchOutlinedIcon />
              </Grid>
              <Grid item>
                <TextField
                  id='standard-basic'
                  label='playlist search'
                  value={filterTxt}
                  onChange={(e: any) => {
                    setFilterTxt(e.target.value);
                  }}
                  name='search'
                  className={classes.textField}
                  InputLabelProps={{
                    className: classes.labelWhite,
                  }}
                  InputProps={{
                    className: classes.labelWhite,
                  }}
                />
              </Grid>
            </Grid>
            <p className={classes.playlistTitle}>
              <span className={classes.playlistSongs}>Playlist Songs</span>
              <span>
                <ExpandMoreIcon className={classes.expandIcon} />
              </span>
            </p>
          </div>
          <PlaylistTable
            tracks={tracks}
            isEditing={isEditing}
            filterTxt={filterTxt}
            removeSong={removeSong}
            isRemovingSong={isRemovingSong}
            userId={userId}
            ownerId={playlist.payload.ownerId}
          />
          {/* <RecommendedSongs /> */}
        </>
      )}
      <Menu
        style={{ width: '1060px', marginTop: 45 }}
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Add From Library</MenuItem>
        <MenuItem onClick={handleClose}>Add From album</MenuItem>
        <MenuItem onClick={handleClose}>Add From ...</MenuItem>
      </Menu>
    </div>
  );
};

export default PlaylistPage;
