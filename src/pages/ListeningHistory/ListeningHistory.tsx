import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IoIosMusicalNotes } from 'react-icons/io';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
import AddToPlaylist from '../../components/PlaylistModal/PlaylistModal';
import useMusicPlayer from '../../hooks/useMusicPlayer';
import { Music } from '../../context/MusicPlayerContext';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import { limitSentence } from '../../utils/utils';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import Loader from 'react-loader-spinner';
import clsx from 'clsx';

import styles from './ListeningHistory.module.css';

const getTimeFormat = (sec: number): string => {
  const date = new Date(0);
  date.setSeconds(sec);
  const timeString = date.toISOString().substr(14, 5);
  return timeString;
};

const RecentlyPlayed: React.FC = () => {
  const [playedToday, setPlayedToday] = useState<Music[]>([]);
  const [playedYesterday, setPlayedYesterday] = useState<Music[]>([]);
  const [playedLastMonth, setPlayedLastMonth] = useState<Music[]>([]);
  const ctx = useContext(AuthContext);
  const { setPlaylistModal, setSongToAdd } = ctx;
  const { token } = ctx.user;

  const addToPlaylist = (track: any, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setSongToAdd({
      album: track.album,
      albumImgUrl: track.albumImg,
      preview: track.preview,
      duration: +track.duration,
      title: track.title,
      id: track.id,
      artist: track.artist.name,
    });
    setPlaylistModal(true);
  };

  const { handleSongClick, playing, currentSong } = useMusicPlayer();
  //

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const listeningHistory = await axios.get(
          'https://music-box-b.herokuapp.com/api/v1/music-box-api/history/getHistory',
          config
        );

        let listening = listeningHistory.data.data.history;
        listening.sort((a: Record<string, any>, b: Record<string, any>) => b.timestamp - a.timestamp);
        listening = listening.slice(0, 6);

        const today: Music[] = [];
        const yesterday: Music[] = [];
        const lastMonth: Music[] = [];
        const validDay = new Date().getDay() - 1;
        const validDayOnly = validDay === -1 ? 6 : validDay;

        listening.forEach((item: Music) => {
          if (new Date(item.timestamp as string).getDay() === new Date().getDay()) {
            today.push(item);
          } else if (new Date(item.timestamp as string).getDay() === validDayOnly) {
            yesterday.push(item);
          } else {
            lastMonth.push(item);
          }
        });

        setPlayedToday(today);
        setPlayedYesterday(yesterday);
        setPlayedLastMonth(lastMonth);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchHistory();
  }, [token]);

  return (
    <motion.div initial='out' animate='in' exit='out' variants={pageTransition} transition={transit}>
      {/* Today */}
      <div className={styles.popularBody}>
        <div className={styles.grid}>
          <div>
            <p>Today</p>
          </div>
          <div className={styles.right}>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <table className={styles.popularTable}>
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {playedToday.length > 0 &&
              playedToday.map((item, idx) => (
                <tr
                  className={clsx(styles.tableRow, currentSong && currentSong.id === item.id && styles.currentSong)}
                  key={item.id}
                  onClick={() => handleSongClick(item.id, playedToday)}
                >
                  <td>{idx + 1}</td>
                  <td>
                    <span className={styles.smallCard}>
                      <IoIosMusicalNotes />
                    </span>
                  </td>
                  <td className=''>
                    <span>{item.title}</span>
                  </td>
                  <td className={styles.tableRow}>{item.artist.name}</td>
                  <td>{limitSentence(item.album as string)}</td>
                  <td>{getTimeFormat(item.duration)}</td>
                  <td>
                    <span>
                      <AddIcon
                        className={styles.add}
                        style={{ fontSize: 'medium', float: 'right' }}
                        onClick={(e) => addToPlaylist(item, e)}
                      />
                    </span>
                    <span>
                      <MoreVertIcon className={styles.dots} style={{ fontSize: 'medium', float: 'right' }} />
                    </span>
                  </td>
                  {currentSong && currentSong.id === item.id && (
                    <div className={styles.playerIcon}>
                      {playing ? (
                        <PauseCircleOutlineOutlinedIcon style={{ fontSize: 15 }} />
                      ) : (
                        <PlayCircleOutlineOutlinedIcon style={{ fontSize: 15 }} />
                      )}
                    </div>
                  )}
                  {currentSong && playing && currentSong.id === item.id && (
                    <div className={styles.isPlayingIcon}>
                      <Loader type='Bars' color='#2DCEEF' height={15} width={15} />
                    </div>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Yesterday */}
      <div className={styles.popularBody}>
        <div className={styles.grid}>
          <div>
            <p>Yesterday</p>
          </div>
          <div className={styles.right}>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <table className={styles.popularTable}>
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {playedYesterday.length > 0 &&
              playedYesterday.map((item, idx) => (
                <tr
                  className={clsx(styles.tableRow, currentSong && currentSong.id === item.id && styles.currentSong)}
                  onClick={() => handleSongClick(item.id, playedYesterday)}
                >
                  <td>{idx + 1}</td>
                  <td>
                    <span className={styles.smallCard}>
                      <IoIosMusicalNotes />
                    </span>
                  </td>
                  <td className=''>
                    <span> {item.title}</span>
                  </td>
                  <td>{item.artist.name}</td>
                  <td>{item.album}</td>
                  <td>{getTimeFormat(item.duration)}</td>
                  <td>
                    <span>
                      <AddIcon className={styles.add} style={{ fontSize: 'medium', float: 'right' }} />
                    </span>
                    <span>
                      <MoreVertIcon className={styles.dots} style={{ fontSize: 'medium', float: 'right' }} />
                    </span>
                  </td>
                  {currentSong && currentSong.id === item.id && (
                    <div className={styles.playerIcon}>
                      {playing ? (
                        <PauseCircleOutlineOutlinedIcon style={{ fontSize: 15 }} />
                      ) : (
                        <PlayCircleOutlineOutlinedIcon style={{ fontSize: 15 }} />
                      )}
                    </div>
                  )}
                  {currentSong && playing && currentSong.id === item.id && (
                    <div className={styles.isPlayingIcon}>
                      <Loader type='Bars' color='#2DCEEF' height={15} width={15} />
                    </div>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Last Month */}
      <div className={styles.popularBody}>
        <div className={styles.grid}>
          <div>
            <p>Last Month</p>
          </div>
          <div className={styles.right}>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <table className={styles.popularTable}>
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {playedLastMonth.length > 0 &&
              playedLastMonth.map((item, idx) => (
                <tr
                  className={clsx(styles.tableRow, currentSong && currentSong.id === item.id && styles.currentSong)}
                  key={item.id}
                  onClick={() => handleSongClick(item.id, playedLastMonth)}
                >
                  <td>{idx + 1}</td>
                  <td>
                    <span className={styles.smallCard}>
                      <IoIosMusicalNotes />
                    </span>
                  </td>
                  <td className=''>
                    <span>{item.title}</span>
                  </td>
                  <td>{item.artist.name}</td>
                  <td>{item.album}</td>
                  <td>{getTimeFormat(item.duration)}</td>
                  <td>
                    <span>
                      <AddIcon className={styles.add} style={{ fontSize: 'medium', float: 'right' }} />
                    </span>
                    <span>
                      <MoreVertIcon className={styles.dots} style={{ fontSize: 'medium', float: 'right' }} />
                    </span>
                  </td>
                  {currentSong && currentSong.id === item.id && (
                    <div className={styles.playerIcon}>
                      {playing ? (
                        <PauseCircleOutlineOutlinedIcon style={{ fontSize: 15 }} />
                      ) : (
                        <PlayCircleOutlineOutlinedIcon style={{ fontSize: 15 }} />
                      )}
                    </div>
                  )}
                  {currentSong && playing && currentSong.id === item.id && (
                    <div className={styles.isPlayingIcon}>
                      <Loader type='Bars' color='#2DCEEF' height={15} width={15} />
                    </div>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AddToPlaylist />
    </motion.div>
  );
};

export default RecentlyPlayed;
