import React, { useState } from 'react';
import Slider from '../Slider/Slider';
import { useLocation } from 'react-router-dom';
import { SongCard } from '../Queue/Queue';
import {
  MdKeyboardArrowDown,
  MdFavoriteBorder,
  MdAdd,
  MdSkipPrevious,
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdRepeat,
  MdKeyboardArrowUp,
} from 'react-icons/md';
import { BiShuffle } from 'react-icons/bi';

import { AiOutlineMenuUnfold, AiOutlineEllipsis } from 'react-icons/ai';

import defaultCover from '../../../assets/playerbg.png';
import styles from './FullScreenPlayer.module.scss';
import useMusicPlayer from '../../../hooks/useMusicPlayer';
interface Props {
  value?: number;
  playNext: () => void;
  playPrev: () => void;
  toggleRepeat: () => void;
  handleVolumeChange: (value: number) => void;
  show: boolean;
  toggleShow: () => void;
  progress: number;
  handleProgress: () => void;
  currentTime: string;
  duration: string;
  onScrub: (value: number) => void;
  shuffle: boolean;
  handleShuffle: () => void;
  likedSongs: number[];
  likeClick: () => void;
}

const FullScreenPlayer = (props: Props) => {
  const [showQueue, setShowQueue] = useState(false);
  const location = useLocation();
  const source = location.pathname.split('/')[1].toLocaleUpperCase();
  const { playing, toggleMusicPlay, audio, currentSong, currentSongArray, trackIndex, queueTitle } = useMusicPlayer();

  React.useEffect(() => {
    if (props.show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [props.show]);
  return (
    <div className={props.show ? styles.Wrapper : [styles.Wrapper, styles.hide].join(' ')}>
      <div className={showQueue ? [styles.main, styles.moveLeft].join(' ') : styles.main}>
        <div className={styles.top}>
          <span className={styles.arrowDown} onClick={props.toggleShow}>
            <MdKeyboardArrowDown />
          </span>
          <div className={styles.queueTitle}>
            <h3>{source}</h3>
            <h2>{queueTitle}</h2>
          </div>
          <img src={defaultCover} alt='' />
          <div className={styles.info}>
            <h3>{currentSong?.title}</h3>
            <h4>{currentSong?.artist?.name}</h4>
          </div>
        </div>
        <div className={styles.controls}>
          <div className={styles.bottom}>
            <div className={styles.icons}>
              <MdAdd />
              <MdFavoriteBorder
                fill={currentSong && props.likedSongs.includes(currentSong.id) ? 'red' : 'white'}
                onClick={props.likeClick}
              />
              <AiOutlineEllipsis style={{ transform: 'rotate(90deg)' }} />
            </div>
            <div className={[styles.slider, 'slider'].join(' ')}>
              <Slider onScrub={props.onScrub} value={props.progress} handleChange={props.onScrub} />
              <div className={styles.time}>
                <span>{props.currentTime}</span>
                <span>{props.duration}</span>
              </div>
            </div>
            <div className={styles.btns}>
              <BiShuffle onClick={props.handleShuffle} style={{ color: props.shuffle ? '#2dceef' : '' }} />
              <MdSkipPrevious className={styles.big} onClick={props.playPrev} />
              {!playing ? (
                <MdPlayArrow className={styles.big} onClick={toggleMusicPlay} />
              ) : (
                <MdPause className={styles.big} onClick={toggleMusicPlay} />
              )}
              <MdSkipNext className={styles.big} onClick={props.playNext} />
              <MdRepeat />
            </div>
          </div>
          <div style={{ marginTop: '30px', width: '100%', marginBottom: 70 }}>
            <Slider isVolume value={audio.current?.volume} handleChange={props.handleVolumeChange} />
          </div>
        </div>
        <div className={showQueue ? [styles.NextQueue, styles.showQueue].join(' ') : styles.NextQueue}>
          <div className={styles.NextUp} onClick={() => setShowQueue(!showQueue)}>
            <AiOutlineMenuUnfold style={{ height: 30, width: 30, marginRight: 10 }} />
            <div className={styles.title}>
              <span>
                Next Up: {currentSongArray[trackIndex + 1]?.artist?.name} - {currentSongArray[trackIndex + 1]?.title}
              </span>
            </div>
            {!showQueue ? (
              <MdKeyboardArrowUp style={{ height: 35, width: 35, marginLeft: 10 }} />
            ) : (
              <MdKeyboardArrowDown style={{ height: 35, width: 35, marginLeft: 10 }} />
            )}
          </div>
          <div className={styles.listItem}>
            {currentSongArray.slice(trackIndex + 1).map((song) => {
              if (song.id !== currentSong?.id)
                return (
                  <SongCard
                    title={song!.title}
                    id={song!.id}
                    likedSongs={props.likedSongs}
                    likeClick={props.likeClick}
                    artistName={song!.artist.name}
                    duration={props.duration}
                  />
                );
              else return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenPlayer;
