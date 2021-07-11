import React from 'react';
import flowClass from './Flow.module.scss';
// import useMusicPlayer from '../../hooks/useMusicPlayer';
// import SMgreen from '../../asset/homepageImages/SMgreen.png'

interface FlowsType {
  image: string;
  playIcon: string;
  bgImg: string;
  color: string;
  pauseIcon?: string;
  clickHandle: () => void;
  playing: boolean;
}

function Flows(prop: FlowsType) {
  // const { toggleMusicPlay, playing } = useMusicPlayer();

  return (
    <div className={flowClass.Big_card} style={{ backgroundImage: `url(${prop.bgImg})` }}>
      <div className={flowClass.SMgreen}>
        <img src={prop.image} className={flowClass.SMgreenImg} alt='bg' />
        <div className={flowClass.fa_play} onClick={prop.clickHandle}>
          <i className={!prop.pauseIcon ? prop.playIcon : prop.playing ? prop.pauseIcon : prop.playIcon}></i>
          {/* <i className='fas fa-play'></i> */}
        </div>
      </div>
      <div className={flowClass.text}>
        <h1 style={{ color: `${prop.color}` }}>FLOW</h1>
        <p>Your personal sound track</p>
        <p className={flowClass.text_two}>Base on your listening</p>
      </div>
    </div>
  );
}
export default Flows;
