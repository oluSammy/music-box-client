import React from 'react';
import GenreCard from '../../components/GenreCard/GenreCard';
import genreStyles from './Genres.module.css';

const Genres = () => {
  return (
    <div className={genreStyles.genreBody} style={{ paddingBottom: 80 }}>
      <div>
        <GenreCard />
      </div>
    </div>
  );
};

export default Genres;
