import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecentlyPlayed.css';
import ListeningHistoryCard from '../../components/ListeningHistoryCard/ListeningHistoryCard';
import Title from '../../components/Title/RP_Title';

const RecentlyPlayed: React.FC = () => {
  const [playedToday, setPlayedToday] = useState<Record<string, any>[]>([]);
  const [playedYesterday, setPlayedYesterday] = useState<Record<string, any>[]>([]);
  const [playedLastMonth, setPlayedLastMonth] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await axios.post('https://music-box-b.herokuapp.com/api/v1/music-box-api/users/login', {
          email: 'chubby@gmail.com',
          password: '12345678',
        });
        console.log(data.data);
        const token = data.data.data.token;
        const userId = data.data.data._id;
        const first = data.data.data.firstName;
        const last = data.data.data.lastName;

        localStorage.setItem('Token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('firstName', first);
        localStorage.setItem('lastName', last);
        return data.data;
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUser();

    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('Token');
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
  }, []);

  return (
    <>
      <div className='historyContainer'>
        <div className='historyBox'>
          {/* Today */}
          <div className='historyDeck'>
            <div className='sectionHeader'>Today</div>
            <Title />

            {playedToday.length > 0 &&
              playedToday.map((item, idx) => (
                <ListeningHistoryCard
                  title={item.title}
                  album={item.album}
                  num={idx + 1}
                  time={item.duration}
                  key={item.id}
                />
              ))}
          </div>

          {/* Yesterday */}
          <div className='historyDeck'>
            <div className='sectionHeader'>Yesterday</div>
            <Title />

            {playedYesterday.length > 0 &&
              playedYesterday.map((item, idx) => (
                <ListeningHistoryCard
                  title={item.title}
                  num={idx + 1}
                  album={item.album}
                  time={item.duration}
                  key={item.id}
                />
              ))}
          </div>

          {/* Last Month */}
          <div className='historyDeck'>
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
        </div>
      </div>
    </>
  );
};

export default RecentlyPlayed;
