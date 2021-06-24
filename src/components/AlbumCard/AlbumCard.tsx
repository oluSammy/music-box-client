import React from 'react'
import albumCard from './AlbumCard.styles';
import albumImg from '../../assets/albumCover-2.png';

// type Props = {

// }

const AlbumCard = () => {
  const classes = albumCard()
  return (
    <div className={classes.albumCard}>
      <div className={classes.albumImgBox}>
        <img className={classes.albumImg} src={albumImg} alt="album pic" />
      </div>
      <h4 className={classes.albumTitle}>Gish</h4>
      <h4 className={classes.albumDate}>Released: 28/05/1991</h4>
    </div>
  )
}

export default AlbumCard
