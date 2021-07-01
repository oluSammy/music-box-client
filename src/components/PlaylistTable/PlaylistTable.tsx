import React, { useState } from 'react';
import playlistTableStyles from './playlistTableStyles';
import clsx from 'clsx';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import { secondsToHms } from '../../utils/utils';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Loader from 'react-loader-spinner';

type Props = {
  tracks: any[];
  filterTxt: string;
  isEditing: boolean;
  removeSong: (id: string) => void;
  isRemovingSong: boolean;
};

const PlaylistTable: React.FC<Props> = ({ tracks, filterTxt, isEditing, removeSong, isRemovingSong }) => {
  const classes = playlistTableStyles();
  const [songs, setSongs] = React.useState<any | []>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (filterTxt === '') {
      setSongs(tracks);
    } else {
      const newTracks: any[] = [];
      tracks.forEach((track: any) => {
        if (track.title.toLowerCase().startsWith(filterTxt.toLowerCase())) newTracks.push(track);
      });
      setSongs(newTracks);
    }
  }, [tracks, filterTxt]);

  return (
    <div className={classes.table}>
      <div className={clsx(classes.tableHeading, classes.hideOnMobile)}>
        <h5 className={classes.title}>#</h5>
        <div className={classes.title}></div>
        <h5 className={classes.title}>TITTLE</h5>
        <h5 className={classes.title}>ARTIST</h5>
        <h5 className={classes.title}>ALBUM</h5>
        <h5 className={classes.title}>TIME</h5>
        <div className={clsx(classes.title, classes.gridEnd)}>
          {isRemovingSong && <Loader type='ThreeDots' color='#FFFFFF' height={20} width={20} />}
        </div>
      </div>
      {songs.length === 0 && filterTxt !== '' && <p className={classes.noSongs}>No results</p>}
      {songs.length === 0 && filterTxt === '' ? (
        <h3 className={classes.noSongs}>Playlist empty, click on "edit" to add songs.</h3>
      ) : (
        songs.map((track: any, idx: number) => (
          <div className={clsx(classes.tableHeading, classes.showOnHover)} key={track._id}>
            <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>{idx + 1}</h5>
            <div className={clsx(classes.contentTxt, classes.gridImg)}>
              <img className={classes.trackCover} src={track.albumImgUrl} alt='track cover' />
            </div>
            <h5 className={clsx(classes.contentTxt, classes.nameMobile)}>
              <span>{track.title}</span>
              <span className={classes.spanMobile}>
                {track.artist} / {secondsToHms(+track.duration)}
              </span>
            </h5>
            <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>{track.artist}</h5>
            <h5 className={clsx(classes.contentTxt, classes.hideOnMobile)}>{track.album}</h5>
            <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>
              {secondsToHms(+track.duration)}
            </h5>
            <div className={clsx(classes.contentTxt, classes.gridEnd)}>
              {isEditing ? (
                <IconButton onClick={() => removeSong(track.id)} style={{ color: '#FFFFFF' }}>
                  <DeleteForeverOutlinedIcon className={classes.deleteIcon} />
                </IconButton>
              ) : (
                <IconButton onClick={handleClick} style={{ color: '#FFFFFF' }}>
                  <MoreHorizOutlinedIcon />
                </IconButton>
              )}
            </div>
          </div>
        ))
      )}
      <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose} className={classes.itemMenu}>
          <div className={classes.menuItem}>
            <PlayCircleOutlineIcon />
            <span className={classes.menuItemText}>play</span>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.itemMenu}>
          <div className={classes.menuItem}>
            <FavoriteBorderIcon />
            <span className={classes.menuItemText}>Like</span>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.itemMenu}>
          <div className={classes.menuItem}>
            <AddIcon />
            <span className={classes.menuItemText}>Add</span>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default PlaylistTable;
