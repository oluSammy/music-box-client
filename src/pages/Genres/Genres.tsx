import React from 'react';
import GenreCard from '../../components/GenreCard/GenreCard';
import genreStyles from './Genres.module.css';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';

const Genres = () => {
  return (
    <motion.div initial='out' animate='in' variants={pageTransition} transition={transit}>
      <div className={genreStyles.genreBody}>
        <div>
          <GenreCard />
        </div>
      </div>
    </motion.div>
  );
};

export default Genres;
