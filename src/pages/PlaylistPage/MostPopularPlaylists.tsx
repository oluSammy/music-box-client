import React, { useCallback, useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
// import albumClass from '../../components/ShowAllCollection/Showƒtitl.module.scss';
import popularStyles from './MostPopularPlaylist.module.css';
import ash_sm from '../../asset/homepageImages/ash_sm.jpg';
import { AuthContext } from '../../context/AuthContext';
import { PLAYLISTS } from '../../pages/Library/Playlist/Playlist';
import SpinLoader from '../../ui/Loader/Loader';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
import { BASE_URL } from '../../constants';

const defaultImg =
  'https://cdns-images.dzcdn.net/images/artist/726daf1256ee5bd50f222c5e463fe7ae/56x56-000000-80-0-0.jpg';

const URL = `${BASE_URL}/api/v1/music-box-api`;

const MostPopularPlaylists = () => {
  const ctx = useContext(AuthContext);
  const { token } = ctx.user;
  const { _id } = ctx.user.data;
  const [playlists, setPlaylists] = useState<PLAYLISTS[]>([]);
  const [loader, setLoader] = useState(true);

  const fetchData = useCallback(async () => {
    const loadData = [];

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${URL}/playlist/mostLiked`, config);

    const { payload } = response.data.data;

    for (const key in payload) {
      const owner = payload[key].ownerId._id === _id;
      const desc = payload[key].likesCount > 1 ? payload[key].likesCount + ' likes' : payload[key].likesCount + ' like';
      loadData.push({
        id: payload[key]._id,
        desc: desc,
        name: payload[key].name,
        updatedAt: payload[key].updatedAt,
        type: owner ? 'owner' : 'liked',
        image: payload[key].imgURL,
        noOfTracks: !!payload[key].tracks.length,
        owner: owner,
        ownerName: `${payload[key].ownerId.firstName} ${payload[key].ownerId.lastName}`,
      });
    }
    setPlaylists(loadData);
    setLoader(false);
  }, [_id, token]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div initial='out' animate='in' exit='out' variants={pageTransition} transition={transit}>
      {loader && <SpinLoader />}
      {!loader && (
        <div className={popularStyles.div}>
          <h2 className={popularStyles.header}>Most Popular Playlists</h2>
          <div className={popularStyles.playlists}>
            {playlists.map((item) => (
              <NavLink to={`/playlist/${item.id}`} className={popularStyles.Nav_link} key={item.id}>
                <div className={popularStyles.album_img} key={item.id}>
                  <img className={popularStyles.imgs || ash_sm} src={item.image || defaultImg} alt='playlist img'></img>
                  <div className={popularStyles.title}>{item.name}</div>
                  <div className={popularStyles.playlistLikes}>
                    <small className={popularStyles.desc}>by {item.owner ? 'you' : item.ownerName}</small>
                    <small className={popularStyles.desc}>{item.desc}</small>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default MostPopularPlaylists;
