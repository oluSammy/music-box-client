import React from 'react'
import playlistTableStyles from './playlistTableStyles';
import clsx from 'clsx';
import trackCover from '../../assets/track-cover.png';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

const PlaylistTable = () => {
  const classes = playlistTableStyles();
  return (
    <div className={classes.table} >
      <div className={clsx(classes.tableHeading, classes.hideOnMobile)}>
        <h5 className={classes.title}>#</h5>
        <div className={classes.title}></div>
        <h5 className={classes.title}>TITTLE</h5>
        <h5 className={classes.title}>ARTIST</h5>
        <h5 className={classes.title}>ALBUM</h5>
        <h5 className={classes.title}>TIME</h5>
        <div className={clsx(classes.title, classes.gridEnd)}></div>
      </div>
      <div className={classes.tableHeading}>
        <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>1</h5>
        <div className={clsx(classes.contentTxt, classes.gridImg)}>
          <img className={classes.trackCover} src={trackCover} alt="track cover" />
        </div>
        <h5 className={clsx(classes.contentTxt, classes.nameMobile)}>
          <span>Bicycle Race</span>
          <span className={classes.spanMobile} >Queen / 3:15</span>
        </h5>
        <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>Queen</h5>
        <h5 className={clsx(classes.contentTxt, classes.hideOnMobile)}>Jazz</h5>
        <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>3:15</h5>
        <div className={clsx(classes.contentTxt, classes.gridEnd)}>
          <MoreHorizOutlinedIcon />
        </div>
      </div>
      <div className={classes.tableHeading}>
        <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>1</h5>
        <div className={clsx(classes.contentTxt, classes.gridImg)}>
          <img className={classes.trackCover} src={trackCover} alt="track cover" />
        </div>
        <h5 className={clsx(classes.contentTxt, classes.nameMobile)}>
          <span>Bicycle Race</span>
          <span className={classes.spanMobile} >Queen / 3:15</span>
        </h5>
        <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>Queen</h5>
        <h5 className={clsx(classes.contentTxt, classes.hideOnMobile)}>Jazz</h5>
        <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>3:15</h5>
        <div className={clsx(classes.contentTxt, classes.gridEnd)}>
          <MoreHorizOutlinedIcon />
        </div>
      </div>
      <div className={classes.tableHeading}>
        <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>1</h5>
        <div className={clsx(classes.contentTxt, classes.gridImg)}>
          <img className={classes.trackCover} src={trackCover} alt="track cover" />
        </div>
        <h5 className={clsx(classes.contentTxt, classes.nameMobile)}>
          <span>Bicycle Race</span>
          <span className={classes.spanMobile} >Queen / 3:15</span>
        </h5>
        <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>Queen</h5>
        <h5 className={clsx(classes.contentTxt, classes.hideOnMobile)}>Jazz</h5>
        <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>3:15</h5>
        <div className={clsx(classes.contentTxt, classes.gridEnd)}>
          <MoreHorizOutlinedIcon />
        </div>
      </div>
      <div className={classes.tableHeading}>
        <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>1</h5>
        <div className={clsx(classes.contentTxt, classes.gridImg)}>
          <img className={classes.trackCover} src={trackCover} alt="track cover" />
        </div>
        <h5 className={clsx(classes.contentTxt, classes.nameMobile)}>
          <span>Bicycle Race</span>
          <span className={classes.spanMobile} >Queen / 3:15</span>
        </h5>
        <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>Queen</h5>
        <h5 className={clsx(classes.contentTxt, classes.hideOnMobile)}>Jazz</h5>
        <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>3:15</h5>
        <div className={clsx(classes.contentTxt, classes.gridEnd)}>
          <MoreHorizOutlinedIcon />
        </div>
      </div>
    </div>
  )
}

export default PlaylistTable
