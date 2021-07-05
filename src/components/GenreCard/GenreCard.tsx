import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import cardStyles from './GenreCard.module.css';

interface Genre {
  id: number;
  name: string;
  picture_medium: string;
  _id: string;
}

const GenreCard = () => {
  const history = useHistory();
  const selectGenre = (genreId: number, playlistId: string) => {
    history.push(`/genres/${genreId}/${playlistId}`);
  };

  const [genres, setGenres] = useState([{}] as Genre[]);

  useEffect(() => {
    const fetchGenres = async () => {
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/genres`);
      setGenres(data);
    };
    fetchGenres();
  }, []);

  return (
    <div>
      <h2 className={cardStyles.genreHeader}>Genres</h2>
      <div className={cardStyles.genreGrid}>
        {genres.map((genre) => {
          return (
            <div key={genre.id} onClick={() => selectGenre(genre.id, genre._id)}>
              <div
                className={cardStyles.genreCard}
                style={{ backgroundImage: `url(${genre.picture_medium})`, backgroundSize: 'cover' }}
              >
                <div className={cardStyles.overlay}></div>
                <div className={cardStyles.genreName}>{genre.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenreCard;
