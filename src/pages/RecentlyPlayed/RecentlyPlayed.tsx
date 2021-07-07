import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './RecentlyPlayed.css';
// import ListeningHistoryCard from '../../components/ListeningHistoryCard/ListeningHistoryCard';
// import Title from '../../components/Title/RP_Title';

import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
        console.log('fetched', listeningHistory);
        const listening = listeningHistory.data.data.history;
        console.log('fetched data', listening);
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
      {/* <div className='historyContainer'> */}
      {/* <div className='historyBox'> */}
      {/* Today */}
      {/* <div className='historyDeck'>
            <div className='sectionHeader'>Today</div> */}
      {/* <Title /> */}

      {/* {playedToday.length > 0 &&
              playedToday.map((item, idx) => (
                <ListeningHistoryCard
                  title={item.title}
                  album={item.album}
                  num={idx + 1}
                  time={item.duration}
                  key={item.id}
                />
              ))}
          </div> */}

      {/* Yesterday */}
      {/* <div className='historyDeck'>
            <div className='sectionHeader'>Yesterday</div> */}
      {/* <Title /> */}

      {/* {playedYesterday.length > 0 &&
              playedYesterday.map((item, idx) => (
                <ListeningHistoryCard
                  title={item.title}
                  num={idx + 1}
                  album={item.album}
                  time={item.duration}
                  key={item.id}
                />
              ))}
          </div> */}

      {/* Last Month */}
      {/* <div className='historyDeck'>
            <div className='sectionHeader'>Last Month</div>
            <Title />

            {playedLastMonth.length > 0 &&
              playedLastMonth.map((item, idx) => (
                <ListeningHistoryCard
                  title={item.title}
                  num={idx + 1}
                  album={item.album}
                  time={item.duration}
                  key={item.id}
                />
              ))}
          </div>
        </div> */}
      {/* </div> */}

      {/* Today */}
      <div className='popularBody'>
        <div className='grid'>
          <div>
            <p>Today</p>
          </div>
          <div className='right'>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <table className='popularTable'>
          <thead>
            <tr>
              <th>#</th>
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
                  <td className='trackTitle'>
                    <span className='singleGenreCard'>
                      <img src={item.link} alt='' />
                    </span>
                    <span>{item.title}</span>
                  </td>
                  <td>{item.artist}</td>
                  <td>{item.album}</td>
                  <td>{item.duration}</td>
                  <td>
                    <span>
                      <AddIcon className='add' style={{ fontSize: 'medium', float: 'right' }} />
                    </span>
                    <span>
                      <MoreVertIcon className='dots' style={{ fontSize: 'medium', float: 'right' }} />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Yesterday */}
      <div className='popularBody'>
        <div className='grid'>
          <div>
            <p>Yesterday</p>
          </div>
          <div className='right'>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <table className='popularTable'>
          <thead>
            <tr>
              <th>#</th>
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
                  <td className='trackTitle'>
                    <span className='singleGenreCard'>
                      <img src={item.link} alt='' />
                    </span>
                    <span>{item.title}</span>
                  </td>
                  <td>{item.artist}</td>
                  <td>{item.album}</td>
                  <td>{item.duration}</td>
                  <td>
                    <span>
                      <AddIcon className='add' style={{ fontSize: 'medium', float: 'right' }} />
                    </span>
                    <span>
                      <MoreVertIcon className='dots' style={{ fontSize: 'medium', float: 'right' }} />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Last Month */}
      <div className='popularBody'>
        <div className='grid'>
          <div>
            <p>Last Month</p>
          </div>
          <div className='right'>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        <table className='popularTable'>
          <thead>
            <tr>
              <th>#</th>
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
                  <td className='trackTitle'>
                    <span className='singleGenreCard'>
                      <img src={item.link} alt='' />
                    </span>
                    <span>{item.title}</span>
                  </td>
                  <td>{item.artist}</td>
                  <td>{item.album}</td>
                  <td>{item.duration}</td>
                  <td>
                    <span>
                      <AddIcon className='add' style={{ fontSize: 'medium', float: 'right' }} />
                    </span>
                    <span>
                      <MoreVertIcon className='dots' style={{ fontSize: 'medium', float: 'right' }} />
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
