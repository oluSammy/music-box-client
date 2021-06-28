import React, { useEffect, useCallback } from 'react';
import Wrapper from '../Library';
import Tab from '../Tab';
import LibraryList from '../LibraryList';
import LibraryCard from '../LibraryCard/LibraryCard';
import axios from 'axios';
import classes from './Album.module.css';
import { SortContext } from '../../../context/SortContext';
import Spinner from '../../../ui/Loader/Loader';
import { SortData, PLAYLISTS } from '../Playlist/Playlist';

interface Props {
  //declare props here
}

// const music = [
//   { name: 'pop', desc: '17 songs 1hr 29min', id: 'c1', updatedAt: `${new Date('21-10-10')}` },
//   { name: 'my jazz', desc: '12 songs 1hr 29min', id: 'c2', updatedAt: new Date('21-10-11') },
//   { name: 'my reggae', desc: '11 songs 59min', id: 'c3', updatedAt: new Date('21-10-12') },
//   { name: 'Love', desc: '9 songs 30min', id: 'c4', updatedAt: new Date('21-10-13') },
//   { name: 'Best of Rap', desc: '15 songs 1hr 29min', id: 'c5', updatedAt: new Date('21-10-14') },
//   { name: 'Nija', desc: '20 songs 1hr 29min', id: 'c6', updatedAt: new Date('21-10-11') },
//   { name: 'Hits', desc: '22 songs 1hr 29min', id: 'c7', updatedAt: new Date('21-10-11') },
// ];

const Library = (props: Props) => {
  const [albums, setAlbums] = React.useState<PLAYLISTS[]>([]);
  const [sortType, setSortType] = React.useState('updatedAt');
  const [SpinLoader, setLoader] = React.useState(true);

  const handleSort = (field: string) => {
    setSortType(field);
    const loadData = SortData(field, albums);
    setAlbums(loadData);
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

    const err = 'User liked no album';
    try {
      const response = await axios.get('https://music-box-b.herokuapp.com/api/v1/music-box-api/album/likes', config);
      const { payload } = response.data.data;
      console.log(response);

      for (const key in payload) {
        loadData.push({
          id: payload[key]._id,
          desc: `${payload[key].tracks.length} songs`,
          name: payload[key].title,
          updatedAt: payload[key].updatedAt,
          image: payload[key].cover,
        });
      }
      const newData = SortData(sortType, loadData);
      setAlbums(newData);
      setLoader(false);
    } catch (error) {
      if (error.response.data.message === err) {
        setAlbums([]);
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
              {albums.length > 0 &&
                albums.map((m) => (
                  <LibraryList name={m.name} description={m.desc} key={m.name} id={m.id} image={m.image} />
                ))}
              {albums.length === 0 && <h3 className={classes['no-album-text']}>You haven't liked any album yet</h3>}
            </LibraryCard>
          </Wrapper>
        </SortContext.Provider>
      )}
    </React.Fragment>
  );
};

export default Library;
