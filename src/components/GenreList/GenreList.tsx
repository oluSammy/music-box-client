import React, { useState, useEffect } from 'react';
import genreClass from './GenreList.module.scss';
// import hipHopImg from '../../asset/homepageImages/hipHop.png';
import axios from 'axios';

interface Genre {
  id: string;
  name: string;
  picture_medium?: string;
  picture_small?: string;
}

function GenreList() {
  const [genre, setGenre] = useState([] as Genre[]);
  const url = 'https://music-box-b.herokuapp.com/api/v1/music-box-api/genres';

  const getAllGenres = async () => {
    try {
      const userToken = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${userToken}` } };
      const {
        data: { data: response },
      } = await axios.get(url, config);

      setGenre(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllGenres();
  }, []);

  return (
    <div className={genreClass.flez}>
      {genre.slice(0, 6).map((items) => (
        <div key={items.id} className={genreClass.genreImg} style={{ backgroundImage: `url(${items.picture_medium})` }}>
          <div className={genreClass.overlay}></div>
          <h3>{items.name}</h3>
        </div>
      ))}
    </div>
  );
}
export default GenreList;
