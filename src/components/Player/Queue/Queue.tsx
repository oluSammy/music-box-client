import React from 'react';
import styles from './Queue.module.scss';
import { MdClose, MdFavoriteBorder } from 'react-icons/md';
import { AiOutlineEllipsis } from 'react-icons/ai';
import IMG from '../../../assets/img-thumbnail.svg';
import useMusicPlayer from '../../../hooks/useMusicPlayer';
interface Props {
  close: () => void;
}

const SongCard = ({
  color,
  title,
  duration,
  artistName,
  id,
}: {
  id?: number;
  color?: string;
  title?: string;
  duration?: string;
  artistName?: string;
}) => {
  const { handleSongClick, currentSongArray } = useMusicPlayer();
  return (
    <div className={styles.SongCard}>
      <div
        className={styles.songInfo}
        onClick={() => {
          if (id) handleSongClick(id, currentSongArray);
        }}
      >
        <img src={IMG} alt='' />
        <div>
          <div style={{ color: color || '#fff' }} className={styles.title}>
            {title}
          </div>
          <div className={styles.artiste}>
            {artistName} &nbsp; / &nbsp; {duration}
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <AiOutlineEllipsis />
        <MdFavoriteBorder />
      </div>
    </div>
  );
};
const Queue = (props: Props) => {
  const { currentSongArray, currentSong, getTimeFormat, handleShuffle, trackIndex, audio, queueTitle } =
    useMusicPlayer();
  return (
    <div className={styles.Queue}>
      <div className={styles.close} onClick={props.close}>
        <MdClose />
      </div>
      <div className={styles.Queue_title}>Queue: {queueTitle} </div>
      <div className={styles.curr_playing} style={{ marginTop: 30 }}>
        <SongCard
          color='#2DCEEF'
          title={currentSong?.title}
          artistName={currentSong?.artist.name}
          id={currentSong?.id}
          duration={audio.current && audio.current.duration ? getTimeFormat(+audio.current.duration) : '0:30'}
        />
      </div>

      <div className={styles.upNext}>
        <div className={styles.head}>
          <div>Next Up</div>
          <button onClick={handleShuffle}>Shuffle</button>
        </div>
        <div className={styles.list}>
          {currentSongArray.map((song, index) => {
            if (song !== currentSong && index > trackIndex)
              return (
                <SongCard
                  title={song!.title}
                  id={song!.id}
                  artistName={song!.artist.name}
                  duration={audio.current && audio.current.duration ? getTimeFormat(+audio.current.duration) : '0:30'}
                />
              );
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Queue;
