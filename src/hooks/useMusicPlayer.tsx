import { useContext, useState } from 'react';
import { MusicPlayerContext } from '../context/MusicPlayerContext';

const useMusicPlayer = () => {
  const { currentSong, trackIndex, setTrackIndex, playing, setPlaying, currentSongArray } =
    useContext(MusicPlayerContext);
  const [state] = useState<{ audio: HTMLAudioElement }>({
    audio: new Audio(currentSong?.preview),
  });
  const playTrack = (index: number) => {
    console.log(index, trackIndex);
    if (index === trackIndex) {
      toggleMusicPlay();
    } else {
      state.audio.pause();
      state.audio = new Audio(currentSong?.preview);
      state.audio.play();
      setTrackIndex(index);
      setPlaying(true);
    }
  };
  const toggleMusicPlay = () => {
    console.log(currentSong);
    if (!currentSong) return;
    playing ? state.audio.pause() : state.audio.play();
    setPlaying(!playing);
  };
  const playNext = () => {
    const newIndex = (trackIndex + 1) % currentSongArray.length;
    playTrack(newIndex);
  };

  const playPrev = () => {
    const newIndex =
      (((trackIndex + -1) % currentSongArray.length) + currentSongArray.length) % currentSongArray.length;
    playTrack(newIndex);
  };
  return {
    toggleMusicPlay,
    playing,
    playTrack,
    currentSong,
    playNext,
    playPrev,
  };
};

export default useMusicPlayer;
