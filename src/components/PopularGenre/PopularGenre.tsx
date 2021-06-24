import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FcLike } from 'react-icons/fc';
import PopularGenreStyles from './PopularGenre.module.css';
import workoutRock from '../../asset/genres/WORKOUT-rock.png';
import loveRock from '../../asset/genres/LOVE-ROCK.png';
import rockability from '../../asset/genres/ROCKABILLY.png';
import eightiesRock from '../../asset/genres/80s-ROCK.png';
import softRock from '../../asset/genres/SOFT-ROCK.png';
import glamRock from '../../asset/genres/GLAM-ROCK.png';
import rockBallads from '../../asset/genres/ROCK-ballads.png';

const PopularGenre = () => {
  return (
    <div>
      <h4 className={PopularGenreStyles.left}>Popular in this week</h4>
      <p className={PopularGenreStyles.right}>
        <MdKeyboardArrowLeft /> <MdKeyboardArrowRight />
      </p>
      <div className={PopularGenreStyles.singleGenreFlex}>
        <div className={PopularGenreStyles.singleGenreDiv}>
          <div className={PopularGenreStyles.singleGenreCard} style={{ background: `url(${workoutRock}) no-repeat 100% 100%/cover `}}></div>
          <div className={PopularGenreStyles.name}>Workout Rock</div>
          <div className={PopularGenreStyles.artistLikes}>
            <FcLike /> 23,594
          </div>
        </div>
        <div className={PopularGenreStyles.singleGenreDiv}>
          <div className={PopularGenreStyles.singleGenreCard} style={{ background: `url(${loveRock}) no-repeat 100% 100%/cover `}}></div>
          <div className={PopularGenreStyles.name}>Love Rock</div>
          <div className={PopularGenreStyles.artistLikes}>
            <FcLike /> 23,594
          </div>
        </div>
        <div className={PopularGenreStyles.singleGenreDiv}>
          <div className={PopularGenreStyles.singleGenreCard} style={{ background: `url(${rockability}) no-repeat 100% 100%/cover `}}></div>
          <div className={PopularGenreStyles.name}>Rockability</div>
          <div className={PopularGenreStyles.artistLikes}>
            <FcLike /> 23,594
          </div>
        </div>
        <div className={PopularGenreStyles.singleGenreDiv}>
          <div className={PopularGenreStyles.singleGenreCard} style={{ background: `url(${eightiesRock}) no-repeat 100% 100%/cover `}}></div>
          <div className={PopularGenreStyles.name}>80s Rock Anthems</div>
          <div className={PopularGenreStyles.artistLikes}>
            <FcLike /> 23,594
          </div>
        </div>
        <div className={PopularGenreStyles.singleGenreDiv}>
          <div className={PopularGenreStyles.singleGenreCard} style={{ background: `url(${softRock}) no-repeat 100% 100%/cover `}}></div>
          <div className={PopularGenreStyles.name}>Soft Rock</div>
          <div className={PopularGenreStyles.artistLikes}>
            <FcLike /> 23,594
          </div>
        </div>
        <div className={PopularGenreStyles.singleGenreDiv}>
          <div className={PopularGenreStyles.singleGenreCard} style={{ background: `url(${glamRock}) no-repeat 100% 100%/cover `}}></div>
          <div className={PopularGenreStyles.name}>Glam Rock</div>
          <div className={PopularGenreStyles.artistLikes}>
            <FcLike /> 23,594
          </div>
        </div>
        <div className={PopularGenreStyles.singleGenreDiv}>
          <div className={PopularGenreStyles.singleGenreCard} style={{ background: `url(${rockBallads}) no-repeat 100% 100%/cover `}}></div>
          <div className={PopularGenreStyles.name}>Rock Ballads</div>
          <div className={PopularGenreStyles.artistLikes}>
            <FcLike /> 23,594
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularGenre;
