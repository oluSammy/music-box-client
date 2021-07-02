import React from 'react';
import Loader from 'react-loader-spinner';

const spinLoader = () => {
  return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader type='Oval' color='#FFFFFF' height={50} width={50} />
    </div>
  );
};

export default spinLoader;
