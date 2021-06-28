import React, { useEffect, useCallback } from 'react';
import Wrapper from '../Library';
import Tab from '../Tab';
import LibraryList from '../LibraryList';
import LibraryCard from '../LibraryCard/LibraryCard';
import axios from 'axios';
import classes from './Artist.module.css';
import { SortContext } from '../../../context/SortContext';
import Spinner from '../../../ui/Loader/Loader';
import { SortData, PLAYLISTS } from '../Playlist/Playlist';

interface Props {
  //declare props here
}

// const music = [
//   { name: 'Bowie', desc: '100220 likes', id: 'c1', updatedAt: `${new Date('21-10-10')}` },
//   { name: 'Lou', desc: '250220 likes', id: 'c2', updatedAt: `${new Date('21-10-11')}` },
//   { name: 'Samuel', desc: '380220 likes', id: 'c3', updatedAt: `${new Date('21-10-12')}` },
//   { name: 'Emeka', desc: '420220 likes', id: 'c4', updatedAt: `${new Date('21-10-13')}` },
//   { name: 'Dimola', desc: '520220 likes', id: 'c5', updatedAt: `${new Date('21-10-14')}` },
//   { name: 'Kizito', desc: '320220 likes', id: 'c6', updatedAt: `${new Date('21-10-15')}` },
//   { name: 'Clash', desc: '620220 likes', id: 'c7', updatedAt: `${new Date('21-10-16')}` },
// ];

const Library = (props: Props) => {
  const [artists, setArtists] = React.useState<PLAYLISTS[]>([]);
  const [sortType, setSortType] = React.useState('updatedAt');
  const [SpinLoader, setLoader] = React.useState(true);

  const handleSort = (field: string) => {
    setSortType(field);
    const loadData = SortData(field, artists);
    setArtists(loadData);
  };
  const fetchData = useCallback(async () => {
    const loadData = [];
    const token = localStorage.getItem('token');
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const err = 'User liked no artist';
    try {
      const response = await axios.get('https://music-box-b.herokuapp.com/api/v1/music-box-api/artist/likes', config);
      const { payload } = response.data.data;

      for (const key in payload) {
        loadData.push({
          id: payload[key]._id,
          desc: `${
            payload[key].likedCount > 1 ? payload[key].likedCount + ' likes' : payload[key].likedCount + ' like'
          }`,
          name: payload[key].name,
          updatedAt: payload[key].updatedAt,
          image: payload[key].picture,
        });
      }
      const newData = SortData(sortType, loadData);
      setArtists(newData);
      setLoader(false);
    } catch (error) {
      if (error.response.data.message === err) {
        setArtists([]);
        setLoader(false);
      }
    }
  }, [sortType]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      {SpinLoader && <Spinner />}
      {!SpinLoader && (
        <SortContext.Provider
          value={{
            onSortHandler: handleSort,
          }}
        >
          <Wrapper>
            <Tab />
            <LibraryCard>
              {artists.length > 0 &&
                artists.map((m) => (
                  <LibraryList name={m.name} description={m.desc} key={m.id} id={m.id} image={m.image} />
                ))}
              {artists.length === 0 && <h3 className={classes['no-artist-text']}>You haven't liked any artist yet</h3>}
            </LibraryCard>
          </Wrapper>
        </SortContext.Provider>
      )}
    </React.Fragment>
  );
};

export default Library;
