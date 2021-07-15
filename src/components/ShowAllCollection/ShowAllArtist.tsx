import React, { useState, useEffect, useContext } from 'react';
import { useLocation, NavLink, useParams } from 'react-router-dom';
import playlistClass from './ShowAllAlbum.module.scss';
import ash_sm from '../../asset/homepageImages/ash_sm.jpg';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import ShowLoader from '../../ui/Loader/Loader';

interface Recent {
  id: string;
  title: string;
  cover_medium: string;
  picture_medium: string;
  name: string;
}
interface LocationState {
  artist: Recent[];
  album?: Recent[];
  playlist?: Recent[];
}

export default function ShowAllPlaylist() {
  const location = useLocation<LocationState>();
  const [allArtist, setAllArtist] = useState<Recent[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchAllArtist = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/search/?name=${id}`, config);

      const artist = data[0].artist.map((item: Record<string, any>) => item);
      setAllArtist(artist);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state) {
      setAllArtist(location.state.artist);
      setIsLoading(false);
      // set loading to false
    } else {
      fetchAllArtist();
    }
    // else fetch from deezer
  }, [fetchAllArtist, location.state]);

  return (
    <>
      {isLoading && <ShowLoader />}
      {!isLoading && allArtist && (
        <div className={playlistClass.allArtist}>
          {allArtist.map((item: Recent) => (
            <NavLink to={`/artist/${item.id}`} className={playlistClass.Nav_link}>
              <div className={playlistClass.artist_img} key={item.id}>
                <img className={playlistClass.img || ash_sm} src={item.picture_medium} alt='artist img'></img>
                <div className={playlistClass.title}> {item.name} </div>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
