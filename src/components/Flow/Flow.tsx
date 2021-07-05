import React from 'react';
import flowClass from './Flow.module.scss';
import useMusicPlayer from '../../hooks/useMusicPlayer';
// import SMgreen from '../../asset/homepageImages/SMgreen.png'

interface FlowsType {
  image: string;
  icon: string;
  bgImg: string;
  color: string;
}

function Flows(prop: FlowsType) {
  const { toggleMusicPlay } = useMusicPlayer();
  return (
    <div className={flowClass.Big_card} style={{ backgroundImage: `url(${prop.bgImg})` }}>
      <div className={flowClass.SMgreen}>
        <img src={prop.image} className={flowClass.SMgreenImg} alt='bg' />
        <div className={flowClass.fa_play} onClick={toggleMusicPlay}>
          <i className={prop.icon}></i>
          {/* <i className='fas fa-play'></i> */}
        </div>
      </div>
      <div className={flowClass.text}>
        <h1 style={{ color: `${prop.color}` }}>FLOW</h1>
        <p>Your personal sound track</p>
        <p className={flowClass.text_two}>Base on your listening history</p>
      </div>
    </div>
  );
}
export default Flows;
