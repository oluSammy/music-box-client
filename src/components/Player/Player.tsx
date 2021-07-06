import React, { useEffect, useState } from 'react';
import Queue from './Queue/Queue';
import styles from './Player.module.scss';
import thumbnail from '../../assets/img-thumbnail.svg';
import {
  MdFavoriteBorder,
  MdVolumeOff,
  MdAdd,
  MdSkipPrevious,
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdRepeat,
} from 'react-icons/md';
import { BiShuffle } from 'react-icons/bi';
import { BsVolumeUpFill } from 'react-icons/bs';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { ProgressBar } from 'react-bootstrap';

import useMusicPlayer from '../../hooks/useMusicPlayer';

interface Props {}
const Player = (props: Props) => {
  const {
    toggleMusicPlay,
    playing,
    currentSong,
    currentSongArray,
    playNext,
    playPrev,
    handleVolumeChange,
    getTimeFormat,
    toggleVolume,
    state,
    handleShuffle,
    shuffle,
    repeat,
    toggleRepeat,
  } = useMusicPlayer();
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('00:30');
  const [progress, setProgress] = useState(0);
  const [openQueue, setOpenQueue] = useState(false);

  // const intervalRef = useRef()
  useEffect(() => {
    // console.log("shuffle", state.audio.currentTime)
    const songLength = state.audio.duration ? getTimeFormat(Number(state.audio.duration)) : '00:30';
    setDuration(songLength);
  }, [state.currentTime, state.audio.duration, getTimeFormat]);

  useEffect(() => {
    // state.audio.addEventListener("timeupdate", () => {
    console.log(state.audio.currentTime);
    const interval = setInterval(() => setCurrentTime(getTimeFormat(+state.audio.currentTime)), 1000);
    const songLength = state.audio.duration ? getTimeFormat(Number(state.audio.duration)) : '00:30';
    setDuration(songLength);
    // if (state.audio.currentTime >= state.audio.duration) setTimeout(() => playNext(), 1000);
    state.audio.addEventListener('ended', () => playNext());
    setProgress((100 / state.audio.duration) * +state.audio.currentTime);

    return () => clearInterval(interval);
    // })
  }, [getTimeFormat, playNext, state.audio, state.audio.currentTime]);

  useEffect(() => {
    setProgress(0);
  }, [currentSongArray]);
  const MobilePlayer = (props: Props) => {
    return (
      <div className={styles.MobilePlayer}>
        <div className={styles.info}>
          <img src={thumbnail} alt='' />
          <h4>
            {currentSong?.title} - {currentSong?.artist.name}
          </h4>
        </div>

        <div className={styles.controls}>
          <div
            className={!shuffle ? styles.shuffle : [styles.shuffle, styles.active].join(' ')}
            onClick={handleShuffle}
          >
            <BiShuffle />
          </div>
          <div className={styles.prev} onClick={playPrev}>
            <MdSkipPrevious />
          </div>
          <div className={styles.play} onClick={toggleMusicPlay}>
            {!playing ? <MdPlayArrow /> : <MdPause />}
          </div>
          <div className={styles.next} onClick={playNext}>
            <MdSkipNext />
          </div>
          <div onClick={toggleRepeat} className={!repeat ? styles.repeat : [styles.repeat, styles.active].join(' ')}>
            <MdRepeat />
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <MobilePlayer />
      {openQueue && <Queue close={() => setOpenQueue(false)} />}
      <div className={styles.Player}>
        <div className={styles.left}>
          <div className={styles.thumbnail}>
            <img src={thumbnail} alt='' />
          </div>
          <div className={styles.info}>
            <h3>{currentSong?.title}</h3>
            <h4>{currentSong?.artist.name}</h4>
            {/* <h3>Love leads</h3>
            <h4>David Bowie</h4> */}
          </div>
          <div className={styles.fav}>
            <MdFavoriteBorder />
          </div>
          <div className={styles.add}>
            <MdAdd />
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.controls}>
            <div
              className={!shuffle ? styles.shuffle : [styles.shuffle, styles.active].join(' ')}
              onClick={handleShuffle}
            >
              <BiShuffle />
            </div>
            <div className={styles.prev} onClick={playPrev}>
              <MdSkipPrevious />
            </div>
            <div className={styles.play} onClick={toggleMusicPlay}>
              {!playing ? <MdPlayArrow /> : <MdPause />}
            </div>
            <div className={styles.next} onClick={playNext}>
              <MdSkipNext />
            </div>
            <div onClick={toggleRepeat} className={!repeat ? styles.repeat : [styles.repeat, styles.active].join(' ')}>
              <MdRepeat />
            </div>
          </div>
          <div className={styles.progress}>
            <p>{currentTime}</p>
            <ProgressBar
              className='gradient'
              style={{ backgroundColor: '#999', maxWidth: '80%', maxHeight: '2px', margin: '10px 20px' }}
              now={progress}
              onChange={() => setProgress((100 / state.audio.duration) * +state.audio.currentTime)}
            />
            <p>{duration}</p>
          </div>
        </div>
        <div className={styles.right}>
          <div
            className={styles.playing}
            style={{ color: openQueue ? '#2DCEEF' : '#FFF' }}
            onClick={() => setOpenQueue(!openQueue)}
          >
            <AiOutlineMenuUnfold />
          </div>
          <div className={styles.speaker} onClick={toggleVolume}>
            {state.volume > 0 ? <BsVolumeUpFill /> : <MdVolumeOff />}
          </div>
          <div className={styles.volume}>
            {/* <ProgressBar
              className='white'
              style={{ minWidth: '100px', maxHeight: '2px', marginLeft: '-5px', backgroundColor: '#999' }}
              now={50}
            /> */}
            <input
              type='range'
              min='0'
              max='1'
              value={state.volume}
              step='0.01'
              onChange={(e) => handleVolumeChange(e)}
            />
          </div>
        </div>

        {/* </div> */}
      </div>
    </>
  );
};

export default Player;
