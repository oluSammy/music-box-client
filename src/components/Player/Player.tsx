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
    audio,
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
    // console.log("shuffle", audio.current?.currentTime)
    if (audio.current) {
      const songLength = audio.current.duration ? getTimeFormat(Number(audio.current.duration)) : '00:30';
      setDuration(songLength);
    }
  }, [audio, audio.current?.currentTime, audio.current?.duration, getTimeFormat]);

  useEffect(() => {
    // audio.current?.addEventListener("timeupdate", () => {
    // console.log(audio)
    // console.log("src", audio.current?.src);
    if (audio.current) {
      const interval = setInterval(() => setCurrentTime(getTimeFormat(+audio.current!.currentTime)), 1000);
      const songLength = audio.current.duration ? getTimeFormat(Number(audio.current.duration)) : '00:30';
      setDuration(songLength);
      // if (audio.current?.currentTime >= audio.current?.duration) setTimeout(() => playNext(), 1000);
      setProgress((100 / audio.current?.duration) * +audio.current?.currentTime);

      audio.current?.addEventListener('ended', () => playNext());
      return () => clearInterval(interval);
    }
    // })
  }, [getTimeFormat, playNext, audio.current?.currentTime, audio]);

  useEffect(() => {
    setProgress(0);
  }, [currentSongArray]);
  const MobilePlayer = (props: Props) => {
    return (
      <div className={styles.MobilePlayer}>
        <div className={styles.info}>
          <img src={thumbnail} alt='' />
          <h4>
            {currentSong?.title} - {currentSong?.artist?.name}
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
            <h4>{currentSong?.artist?.name}</h4>
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
              onChange={() => {
                if (audio.current) setProgress((100 / audio.current.duration) * +audio.current.currentTime);
              }}
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
            {audio.current && audio.current.volume > 0 ? <BsVolumeUpFill /> : <MdVolumeOff />}
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
              value={audio.current?.volume}
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
