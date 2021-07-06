import { useContext, useState, ChangeEvent, useCallback } from 'react';
import { MusicPlayerContext, Music } from '../context/MusicPlayerContext';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const useMusicPlayer = () => {
  const {
    currentSong,
    trackIndex,
    setTrackIndex,
    playing,
    setPlaying,
    setCurrentSong,
    currentSongArray,
    setCurrentSongArray,
    originalSongAray,
    queueTitle,
  } = useContext(MusicPlayerContext);
  const [state, setState] = useState<{ audio: HTMLAudioElement; volume: number; currentTime: number }>({
    audio: new Audio(),
    volume: 1,
    currentTime: 0,
  });
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const { user } = useContext(AuthContext);
  useCallback(() => {
    // setState({ ...state, audio: new Audio(currentSong?.preview) })
    if (playing) state.audio.pause();
  }, [playing, state]);
  /**
   *
   * @param id Id of song to be played
   * @param arr an array of songs from which song is to be played
   */
  const updateListeningHistory = async (id: number) => {
    try {
      console.log(id);
      const {
        data: { message },
      } = await axios.put(
        `https://music-box-b.herokuapp.com/api/v1/music-box-api/history/updateHistory/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSongClick = (id: number, arr: Music[]) => {
    const index = arr.findIndex((song) => song.id === id);
    setCurrentSongArray(arr);
    if (!currentSong) {
      setPlaying(true);
      setCurrentSong(arr[index]);
      state.audio = new Audio(arr[index].preview);
      state.audio.play();
      // return playTrack(index)
    } else {
      if (currentSong.id === id || playing) {
        state.audio.pause();
        playTrack(index);
      } else {
        state.audio.pause();
        setCurrentSong(arr[index]);
        state.audio = new Audio(arr[index].preview);
        state.audio.play();
        setTrackIndex(index);
        setPlaying(true);
      }
    }
    updateListeningHistory(id);

    // playTrack(index);
    // setCurrentSongArray(arr)
    // setCurrentSong(arr[index]);
    // setTrackIndex(index);
  };

  const playTrack = (index: number) => {
    if (index === trackIndex && currentSongArray[index] === currentSong) {
      toggleMusicPlay();
    } else {
      // state.audio.pause();
      if (currentSongArray[index]) {
        // setState({...state, audio: new Audio(currentSongArray[index].preview)})
        state.audio = new Audio(currentSongArray[index].preview);
        state.audio.play();
        setTrackIndex(index);
        setCurrentSong(currentSongArray[index]);
        setPlaying(true);
      }
    }
  };
  const toggleMusicPlay = () => {
    if (!currentSong) return;
    console.log(playing, currentSong);
    if (currentSong && playing) {
      console.log('I called to pause cus sum is playing');
      setPlaying(false);
      return state.audio.pause();
    } else {
      if (!state.audio.src) state.audio.src = currentSong.preview;
      state.audio.play();
    }
    setPlaying(!playing);
  };

  const playNext = () => {
    if (repeat) return playTrack(trackIndex);
    const newIndex = (trackIndex + 1) % currentSongArray.length;
    setCurrentSong(currentSongArray[newIndex]);
    playTrack(newIndex);
    console.log(trackIndex, newIndex);
    console.log(state.audio);
  };

  const playPrev = () => {
    if (repeat) return playTrack(trackIndex);
    const newIndex =
      (((trackIndex + -1) % currentSongArray.length) + currentSongArray.length) % currentSongArray.length;
    setCurrentSong(currentSongArray[newIndex]);
    playTrack(newIndex);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    state.audio.volume = +e.target.value;
    setState({ ...state, volume: +e.target.value });
    console.log(state.audio.volume);
  };

  const toggleVolume = () => {
    const initialVolume = state.volume;
    if (initialVolume > 0) {
      setState({ ...state, volume: 0 });
      state.audio.volume = 0;
    } else {
      setState({ ...state, volume: 1 });
      state.audio.volume = 1;
    }
  };

  const handleShuffle = () => {
    if (shuffle) setCurrentSongArray(originalSongAray);
    else {
      const sortedArray = currentSongArray.sort(() => Math.random() - 0.5);
      console.log(sortedArray);
      setCurrentSongArray(sortedArray);
    }
    setShuffle(!shuffle);
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };
  const getTimeFormat = (sec: number): string => {
    const date = new Date(0);
    date.setSeconds(sec);
    const timeString = date.toISOString().substr(14, 5);
    return timeString;
  };
  return {
    toggleMusicPlay,
    playing,
    playTrack,
    currentSong,
    playNext,
    playPrev,
    handleVolumeChange,
    state,
    currentSongArray,
    setCurrentSongArray,
    handleShuffle,
    shuffle,
    toggleVolume,
    repeat,
    toggleRepeat,
    getTimeFormat,
    trackIndex,
    queueTitle,
    handleSongClick,
  };
};

export default useMusicPlayer;
