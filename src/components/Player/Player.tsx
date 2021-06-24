import React from 'react'
import styles from "./Player.module.scss";
import thumbnail from "../../assets/img-thumbnail.svg";
import { MdFavoriteBorder, MdAdd, MdSkipPrevious, MdPlayArrow, MdPause, MdSkipNext, MdRepeat } from "react-icons/md";
import { BiShuffle } from "react-icons/bi";
import { BsVolumeUpFill } from "react-icons/bs";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { ProgressBar } from "react-bootstrap";
import useMusicPlayer from "../../hooks/useMusicPlayer"


export const getTimeFormat = (sec: number): string => {
    const date = new Date(0);
    date.setSeconds(sec);
    const timeString = date.toISOString().substr(14, 5);
    return timeString;
};
interface Props {
}
const Player = (props: Props) => {
    const { toggleMusicPlay, playing, currentSong, playNext, playPrev } = useMusicPlayer()


    const songLength = currentSong && currentSong.duration ? getTimeFormat(Number(currentSong.duration)) : "0:00"
    return (
        <div className={styles.Player}>
            <div className={styles.left}>
                <div className={styles.thumbnail}>
                    <img src={thumbnail} alt="" />
                </div>
                <div className={styles.info}>
                    <h3>{currentSong?.title}</h3>
                    <h4>{currentSong?.artistName}</h4>
                </div>
                <div className={styles.fav}><MdFavoriteBorder /></div>
                <div className={styles.add}><MdAdd /></div>
            </div>
            <div className={styles.middle}>
                <div className={styles.controls}>
                    <div className={styles.shuffle}><BiShuffle /></div>
                    <div className={styles.prev} onClick={playPrev}><MdSkipPrevious /></div>
                    <div className={styles.play} onClick={toggleMusicPlay}>{!playing ? <MdPlayArrow /> : <MdPause />}</div>
                    <div className={styles.next} onClick={playNext}><MdSkipNext /></div>
                    <div className={styles.repeat}><MdRepeat /></div>
                </div>
                <div className={styles.progress}>
                    <p>3:00</p>
                    <ProgressBar className="gradient" style={{ backgroundColor: "#999", minWidth: "450px", maxHeight: "2px", margin: "10px 20px" }} now={60} />
                    <p>{songLength}</p>
                </div>

            </div>
            <div className={styles.right}>
                <div className={styles.playing}><AiOutlineMenuUnfold /></div>
                <div className={styles.speaker}><BsVolumeUpFill /></div>
                <div className={styles.volume}>
                    <ProgressBar className="white" style={{ minWidth: "100px", maxHeight: "2px", marginLeft: "-5px", backgroundColor: "#999" }} now={50} />
                </div>
            </div>


            {/* </div> */}
        </div>
    )
}

export default Player
