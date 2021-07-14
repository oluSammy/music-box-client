import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IoIosMusicalNotes } from 'react-icons/io';

import styles from './ListeningHistory.module.css';

const getTimeFormat = (sec: number): string => {
  const date = new Date(0);
  date.setSeconds(sec);
  const timeString = date.toISOString().substr(14, 5);
  return timeString;
};

const RecentlyPlayed: React.FC = () => {
  const [playedToday, setPlayedToday] = useState<Record<string, any>[]>([]);
  const [playedYesterday, setPlayedYesterday] = useState<Record<string, any>[]>([]);
  const [playedLastMonth, setPlayedLastMonth] = useState<Record<string, any>[]>([]);
  const ctx = useContext(AuthContext);
  const { token } = ctx.user;
  console.log(token);

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

        const today: Record<string, any>[] = [];
        const yesterday: Record<string, any>[] = [];
        const lastMonth: Record<string, any>[] = [];
        const validDay = new Date().getDay() - 1;
        const validDayOnly = validDay === -1 ? 6 : validDay;

        listening.forEach((item: Record<string, any>) => {
          if (new Date(item.timestamp).getDay() === new Date().getDay()) {
            today.push(item);
          } else if (new Date(item.timestamp).getDay() === validDayOnly) {
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
    <>
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
                <tr key={item.id}>
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
                <tr key={item.id}>
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
                <tr key={item.id}>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecentlyPlayed;
