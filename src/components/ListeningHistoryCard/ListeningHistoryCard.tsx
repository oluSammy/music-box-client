import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@material-ui/icons/Add';
import img from '../../assets/recentlyImg.png';

interface Props {
  num: number;
  title: string;
  album: string;
  time: string;
}

const ListeningHistoryCard = ({ title, album, time, num }: Props) => {
  return (
    <>
      <div className='randomGrid'>
        <p>{num}</p>
        <div className='imgBox'>
          <img className='recentlyImg' src={img} alt='recently' />
        </div>
        <p>{title}</p>
        <p>Bowie</p>
        <p className='dim'>{album}</p>
        <p className='dim'>{time}</p>
        <FavoriteBorderIcon style={{ fontSize: 'medium' }} />
        <AddIcon style={{ fontSize: 'medium' }} />
      </div>
    </>
  );
};

export default ListeningHistoryCard;
