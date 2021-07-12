import { useContext, useState, ChangeEvent, useRef, useEffect } from 'react';
import { MusicPlayerContext, Music } from '../context/MusicPlayerContext';

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
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const audio = useRef<HTMLAudioElement>(new Audio(currentSong?.preview));

  useEffect(() => {
    console.log('MOUNTED');
    return () => console.log('UNMOUNTED');
  });

  useEffect(() => {
    // toggleMusicPlay()
    console.log(playing);
    if (playing) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
    console.log('I should run once');
  }, [playing]);

  // useEffect(() => {
  //   if (currentSongArray.length) {
  //     audio.current.pause()
  //     audio.current.currentTime = 0;
  //     // audio.current = new Audio()
  //     audio.current.src = currentSongArray[trackIndex].preview
  //     // audio.current.play()
  //     setCurrentSong(currentSongArray[trackIndex])
  //   }
  // }, [currentSongArray, setCurrentSong, trackIndex])

  // useEffect(() => {
  //   audio.current.preload = "true"
  //   console.log("I should run once too")

  // }, [audio.current.src])

  useEffect(() => {
    // audio.current.pause();
    if (currentSong) {
      console.log('now playing', audio, audio.current);
      console.log(audio.current.src, currentSong.preview);
      if (audio.current.src !== currentSong.preview) {
        audio.current.pause();
        audio.current.src = currentSong.preview;
        audio.current.play();
      }
      if (currentSong && currentSongArray.length) {
        localStorage.setItem('song', JSON.stringify(currentSong));
        localStorage.setItem('songArray', JSON.stringify(currentSongArray));
      }
      // setPlaying(true)
    }
  }, [currentSong, currentSongArray]);
  /**
   *
   * @param id Id of song to be played
   * @param arr an array of songs from which song is to be played
   */

  const handleSongClick = (id: number, arr?: Music[]) => {
    if (arr) {
      const index = arr.findIndex((song) => song.id === id);
      if (index === trackIndex && arr[index]?.id === currentSong?.id) {
        return toggleMusicPlay();
      }
      console.log('audio src', audio.current.src);
      // const src = audio.current.src.split("/")
      // if (src.includes("undefined")) {
      //   audio.current.src = arr[index].preview
      // }
      console.log('index', index);
      setCurrentSongArray(arr);
      setCurrentSong(arr[index]);
      setTrackIndex(index);
      setPlaying(true);
      // resetSong()
      console.log(['HandleSongClick'], playing, currentSong, audio.current.src);
    }
  };

  // const resetSong = () => {
  //   if (currentSong) {
  //     audio.current.currentTime = 0;
  //     audio.current.src = currentSong.preview;
  //     setTimeout(() => {
  //       if (playing) {
  //         audio.current.play()
  //       } else {
  //         audio.current.pause()
  //       }
  //     }, 300)

  //   }

  // }
  const playTrack = (index: number) => {
    // if (currentSong && index === trackIndex && currentSongArray[index]?.id === currentSong?.id) {
    //   return toggleMusicPlay()
    // }
    // audio.current.pause();
    // setPlaying(false)
    // audio.current = new Audio(currentSongArray[index]?.preview);
    // // audio.current.play();
    // setPlaying(true)
    // setCurrentSong(currentSongArray[index]);
    // setTrackIndex(index)
  };
  const toggleMusicPlay = () => {
    if (audio.current.paused) {
      console.log('I should pause!!!');
      setPlaying(true);
      // return audio.current.play()
    } else {
      // audio.current.pause()
      setPlaying(false);
    }
    console.log(audio.current.paused, playing);
  };

  const playNext = () => {
    if (repeat) {
      audio.current.pause();
      audio.current.currentTime = 0;
      audio.current.src = currentSong!.preview;
      return;
    }
    audio.current.pause();
    setPlaying(!playing);
    const newIndex = (trackIndex + 1) % currentSongArray.length;
    handleSongClick(currentSongArray[newIndex].id, currentSongArray);
    setCurrentSong(currentSongArray[newIndex]);
    playTrack(newIndex);
    console.log(trackIndex, newIndex);
    console.log(audio.current);
  };

  const playPrev = () => {
    if (repeat) return playTrack(trackIndex);
    const newIndex =
      (((trackIndex + -1) % currentSongArray.length) + currentSongArray.length) % currentSongArray.length;
    // setCurrentSong(currentSongArray[newIndex]);
    playTrack(newIndex);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audio.current) {
      audio.current.volume = +e.target.value;
      console.log(audio.current.volume);
    }
  };

  const toggleVolume = () => {
    if (audio.current) {
      const initialVolume = audio.current.volume;
      if (initialVolume > 0) {
        audio.current.volume = 0;
      } else {
        audio.current.volume = 1;
      }
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

  // const Audio = () => {
  //   return (
  //     <audio
  //       autoPlay
  //       ref={audio}
  //       src={currentSongArray[trackIndex].preview}
  //     />
  //   );
  // };

  return {
    toggleMusicPlay,
    playing,
    playTrack,
    currentSong,
    playNext,
    playPrev,
    handleVolumeChange,
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
    audio,
    handleSongClick,
  };
};

export default useMusicPlayer;
