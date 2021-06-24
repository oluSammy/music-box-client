import React, { useContext } from 'react'
import { MusicPlayerContext } from "../../../context/MusicPlayerContext"
import { Music } from "../../../context/MusicPlayerContext"
import useMusicPlayer from '../../../hooks/useMusicPlayer';
interface Props {

}

const Tracklist = (props: Props) => {
    const { currentSongArray, updateSong, currentSong } = useContext(MusicPlayerContext);
    const { playTrack } = useMusicPlayer()

    const handleClick = (song: Music, i: number) => {
        updateSong(song);
        playTrack(i)
        console.log("clicked", currentSong)
    }
    return (
        <div>
            <div>{currentSong?.title || "Hello"}</div>
            {currentSongArray.map((song, i) => <div key={i} style={{ color: "#fff" }} onClick={() => handleClick(song, i)}>{song.title}</div>)}
        </div>
    )
}

export default Tracklist
