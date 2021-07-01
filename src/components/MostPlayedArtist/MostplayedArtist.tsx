import mostPlayedClass from '../Flow/Played.module.scss';
// import NatureImg from '../../asset/homepageImages/Nature.png';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

interface Recent {
  _id: string;
  name: string;
  listeningCount: number;
  likedCount?: number;
  picture_medium: string;
}

function MostPlayedArtist() {
  // set state for resently played
  const [mostPlayed, setMostPlayed] = useState([] as Recent[]);

  const url = 'https://music-box-b.herokuapp.com/api/v1/music-box-api/';

  const getMostPlayedArtist = async () => {
    try {
      const userToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const {
        data: { data: response },
      } = await axios.get(`${url}/artist/mostPlayed`, config);
        
    //   console.log(response);

      setMostPlayed(response.payload);
    } catch (error) {
      console.log(error.message);
    }
  };
  // getRecentlyPlayedPlaylist()    

  useEffect(() => {
    getMostPlayedArtist();
  }, []);

  return (
    <div className={mostPlayedClass.parent_div}>
      {mostPlayed.slice(1,9).map((item) => (
        <div className={mostPlayedClass.rounded} key={item._id}>
          <div className={mostPlayedClass.Sm_cardRound}>
            <img src={item.picture_medium} alt='pc' />
          </div>
          <div className={mostPlayedClass.like}>
            <p>{item.name}</p>
            <i className='fas fa-heart'>
              {' '} 
              <span>{item.listeningCount}</span>
            </i>
          </div>
        </div>    
      ))}
    </div>
  );
}
export default MostPlayedArtist;
