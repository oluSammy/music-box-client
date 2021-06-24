import React from 'react';
import NewReleaseStyles from './NewReleaseGenre.module.css';
import vImg from '../../asset/genres/v-img.png';
import powerWolf from '../../asset/genres/power-wolf.png';
import glastonberry from '../../asset/genres/glastonberry.png';
import ofDeathAndSin from '../../asset/genres/ofDeathAndSin.png';
import dontStop from '../../asset/genres/dontStop.png';
import sunlightTonight from '../../asset/genres/sunlightTonight.png';

const NewReleaseGenre = () => {
    return (
        <div>
            <h4 className={NewReleaseStyles.left}>New releases</h4>
      <p className={NewReleaseStyles.right}>view all</p>
      <div className={NewReleaseStyles.singleGenreGrid}>
        <div className={NewReleaseStyles.singleGenreDiv}>
          <div className={NewReleaseStyles.singleGenreCard} style={{ background: `url(${vImg}) no-repeat 100% 100%/cover`}}></div>
          <div className={NewReleaseStyles.name}>V</div>
          <p className={NewReleaseStyles.about}>lorem</p>
          <p className={NewReleaseStyles.about}>ipsum lorem</p>
        </div>
        <div className={NewReleaseStyles.singleGenreDiv}>
          <div className={NewReleaseStyles.singleGenreCard} style={{ background: `url(${powerWolf}) no-repeat 100% 100%/cover`}}></div>
          <div className={NewReleaseStyles.name}>Powerwolf</div>
          <p className={NewReleaseStyles.about}>lorem</p>
          <p className={NewReleaseStyles.about}>ipsum lorem</p>
        </div>
        <div className={NewReleaseStyles.singleGenreDiv}>
          <div className={NewReleaseStyles.singleGenreCard} style={{ background: `url(${glastonberry}) no-repeat 100% 100%/cover`}}></div>
          <div className={NewReleaseStyles.name}>Glastonberry</div>
          <p className={NewReleaseStyles.about}>lorem</p>
          <p className={NewReleaseStyles.about}>ipsum lorem</p>
        </div>
        <div className={NewReleaseStyles.singleGenreDiv}>
          <div className={NewReleaseStyles.singleGenreCard} style={{ background: `url(${ofDeathAndSin}) no-repeat 100% 100%/cover`}}></div>
          <div className={NewReleaseStyles.name}>Of death and sin</div>
          <p className={NewReleaseStyles.about}>lorem</p>
          <p className={NewReleaseStyles.about}>ipsum lorem</p>
        </div>
        <div className={NewReleaseStyles.singleGenreDiv}>
          <div className={NewReleaseStyles.singleGenreCard} style={{ background: `url(${dontStop}) no-repeat 100% 100%/cover`}}></div>
          <div className={NewReleaseStyles.name}>50 years - don't stop</div>
          <p className={NewReleaseStyles.about}>lorem</p>
          <p className={NewReleaseStyles.about}>ipsum lorem</p>
        </div>
        <div className={NewReleaseStyles.singleGenreDiv}>
          <div className={NewReleaseStyles.singleGenreCard} style={{ background: `url(${sunlightTonight}) no-repeat 100% 100%/cover`}}></div>
          <div className={NewReleaseStyles.name}>Sunlight Tonight</div>
          <p className={NewReleaseStyles.about}>lorem</p>
          <p className={NewReleaseStyles.about}>ipsum lorem</p>
        </div>
        <div className={NewReleaseStyles.singleGenreDiv}>
          <div className={NewReleaseStyles.singleGenreCard} style={{ background: `url(${powerWolf}) no-repeat 100% 100%/cover`}}></div>
          <div className={NewReleaseStyles.name}>ducati</div>
          <p className={NewReleaseStyles.about}>lorem</p>
          <p className={NewReleaseStyles.about}>ipsum lorem</p> 
        </div>
      </div>
        </div>
    )
}

export default NewReleaseGenre
