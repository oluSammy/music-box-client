import React, { useCallback } from 'react';
import Wrapper from '../Library';
import Tab from '../Tab';
import LibraryList from '../LibraryList';
import LibraryCard from '../LibraryCard/LibraryCard';
import AddPlaylist from '../Playlist/AddPlaylist';
import Modal from '../../../ui/Modal/Modal';
import { useEffect } from 'react';
import axios from 'axios';
import { SortContext } from '../../../context/SortContext';
import Spinner from '../../../ui/Loader/Loader';
import BackdropRoller from '../../../ui/Backdrop/Backdrop';
import { secondsToHms } from '../../../utils/convertSecondsToHm';

interface Props {
  //declare props here
}

interface Arr {
  duration: string;
  [propsName: string]: any;
}

const formatTime = (arr: Arr[]) => {
  const dur = arr.reduce((a, b) => a + Number(b.duration), 0);
  const result = secondsToHms(dur);
  return result;
};

export interface PLAYLISTS {
  id: string;
  desc: string;
  name: string;
  updatedAt: string | Date;
  image?: string;
  type?: string;
}

export const SortData = (field: string, data: PLAYLISTS[]): PLAYLISTS[] => {
  data.sort((a, b) => {
    if (field === 'updatedAt') {
      return b.updatedAt > a.updatedAt ? 1 : -1;
    }
    if (field === 'songs') {
      const num1 = b.desc.split(' ')[0];
      const num2 = a.desc.split(' ')[0];
      return Number(num1) > Number(num2) ? 1 : -1;
    }
    return b.name > a.name ? -1 : 1;
  });
  return data;
};

const Library = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [playlists, setPlaylists] = React.useState<PLAYLISTS[]>([]);
  const [sortType, setSortType] = React.useState('updatedAt');
  const [SpinLoader, setLoader] = React.useState(true);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const URL = 'https://music-box-b.herokuapp.com/api/v1/music-box-api';

  const openHandler = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSort = (field: string) => {
    setSortType(field);
    const loadData = SortData(field, playlists);
    setPlaylists(loadData);
  };

  const addData = async (data: Record<string, any>) => {
    setOpenBackdrop(true);
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${URL}/playlist`, data, config);
      await fetchData();
      setOpenBackdrop(false);
    } catch (error) {
      console.log(error.response.data.message);
      setOpenBackdrop(false);
    }
  };

  const fetchData = useCallback(async () => {
    const loadData = [];
    const url = `${URL}/users/login`;
    const data = {
      email: 'music@ymail.com',
      password: '12345678',
    };

    const res = await axios.post(url, data);

    const { token } = res.data.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', res.data.data._id);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${URL}/playlist`, config);
    const privateRes = await axios.get(`${URL}/playlist/created`, config);
    const isPublic = privateRes.data.data.payload.filter((p: Record<string, any>) => !p.isPublic);
    const { payload } = response.data.data;
    payload.push(...isPublic);

    for (const key in payload) {
      // const typeOfPlaylist = payload[key].ownerId === res.data.data._id ? 'owner' : 'liked'
      const owner = payload[key].ownerId === res.data.data._id;
      const liked = payload[key].likes.includes(res.data.data._id);
      const desc =
        payload[key].tracks.length > 1 ? payload[key].tracks.length + ' songs ' : payload[key].tracks.length + ' song ';
      if (owner || liked) {
        loadData.push({
          id: payload[key]._id,
          desc: desc + ' ' + formatTime(payload[key].tracks),
          name: payload[key].name,
          updatedAt: payload[key].updatedAt,
          type: owner ? 'owner' : 'liked',
          image: payload[key].imgURL,
        });
      }
    }
    const newData = SortData(sortType, loadData);
    setPlaylists(newData);
    setLoader(false);
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
              <AddPlaylist onHandleOpen={openHandler} />
              {playlists.map((m) => (
                <LibraryList
                  name={m.name}
                  description={m.desc}
                  key={m.id}
                  id={m.id}
                  playlistType={m.type}
                  image={m.image}
                />
              ))}
            </LibraryCard>
          </Wrapper>
          <Modal onAddPlaylist={addData} onOpen={open} onHandleClose={handleClose} />
        </SortContext.Provider>
      )}
      <BackdropRoller open={openBackdrop} />
    </React.Fragment>
  );
};

export default Library;
