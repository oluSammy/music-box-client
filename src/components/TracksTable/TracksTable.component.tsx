import React, { useState } from 'react';
import tracksTableStyles from './tracksTable.styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { secondsToHms } from '../../utils/utils';

type props = {
  tracks: any;
};

const TracksTable: React.FC<props> = ({ tracks }) => {
  const classes = tracksTableStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.tracksWrapper}>
      <div className={classes.tracksGrid}>
        <div className={classes.title}>#</div>
        <div className={classes.title}>Title</div>
        <div className={classes.title}>Artist</div>
        <div className={classes.title}>Time</div>
        <div></div>
        <div></div>
      </div>
      {tracks &&
        tracks.map((track: any, idx: number) => (
          <div className={clsx(classes.tracksGrid, classes.showOnHover, classes.trackTxt)} key={track.id}>
            <div className={classes.track}>{idx + 1}</div>
            <div className={clsx(classes.track, classes.trackMobile)}>
              <span>{track.title && track.title}</span>
              <span className={classes.durationMobile}>2:43</span>
            </div>
            <div className={clsx(classes.track, classes.hideMobile)}>{track.artist && track.artist.name} </div>
            <div className={clsx(classes.track, classes.hideMobile)}>{secondsToHms(+track.duration)}</div>
            <div className={clsx(classes.trackIcon, classes.hideMobile)}>
              {/* <FavoriteBorderIcon className={classes.trackBtn} /> */}
            </div>
            <div className={clsx(classes.trackIcon, classes.hideMobile)}>
              <AddIcon style={{ fontSize: 14 }} className={classes.trackBtn} />
            </div>
            <IconButton className={classes.moreIcon} onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </div>
        ))}

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

export default TracksTable;
