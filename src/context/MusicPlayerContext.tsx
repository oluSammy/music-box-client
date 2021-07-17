import React, { ReactNode, createContext, useState, useEffect, SetStateAction, Dispatch } from 'react';
interface Props {
  children: ReactNode;
}
export interface Music {
  title: string;
  id: number;
  artist: { name: string };
  thumbnail: string;
  link: string;
  preview: string;
  duration: number;
}

interface MusicContext {
  currentSong: Music | null;
  updateSong: (song: Music) => void;
  currentSongArray: Music[];
  setCurrentSongArray: Dispatch<SetStateAction<Music[]>>;
  setPlaying: (x: boolean) => void;
  // setPlaying: Dispatch<SetStateAction<boolean>>;
  setTrackIndex: Dispatch<SetStateAction<number>>;
  playing: boolean;
  trackIndex: number;
  setCurrentSong: (x: Music) => void;
  // setCurrentSong: Dispatch<SetStateAction<Music>>;
  originalSongArray: Music[];
  setOriginalSongArray: Dispatch<SetStateAction<Music[]>>;
  queueTitle: string;
  setQueueTitle: (x: string) => void;
}
export const MusicPlayerContext = createContext({} as MusicContext);

const MusicPlayerProvider = (props: Props) => {
  // const [currentSong, setCurrentSong] = useState<Music>({} as Music);
  const [currentSongArray, setCurrentSongArray] = useState([] as Music[]);
  const [originalSongArray, setOriginalSongArray] = useState([] as Music[]);
  // const [playing, setPlaying] = useState(false);
  const [state, setState] = useState({
    playing: false,
    currentSong: {} as Music,
    queueTitle: '',
  });
  const [trackIndex, setTrackIndex] = useState(0);

  const { playing, currentSong, queueTitle } = state;
  const setPlaying = (x: boolean) => setState((state) => ({ ...state, playing: x }));
  const setCurrentSong = (x: Music) => setState((state) => ({ ...state, currentSong: x }));
  const setQueueTitle = (x: string) => {
    localStorage.setItem('title', x);
    setState((state) => ({ ...state, queueTitle: x }));
  };
  useEffect(() => {
    const lastSong = localStorage.getItem('song');
    const lastSongArray = localStorage.getItem('songArray');
    const originalArray = localStorage.getItem('originalSongArray');
    const title = localStorage.getItem('title');
    const index = localStorage.getItem('index');
    if (lastSong && lastSongArray && title && index && originalArray) {
      const parsedLastSong: Music = JSON.parse(lastSong);
      const parsedLastSongArray: Music[] = JSON.parse(lastSongArray);
      const parsedLastOriginalArray: Music[] = JSON.parse(originalArray);
      setCurrentSong(parsedLastSong);
      setCurrentSongArray(parsedLastSongArray);
      setOriginalSongArray(parsedLastOriginalArray);
      setQueueTitle(title);
      setPlaying(false);
      setTrackIndex(+index);
    }
  }, []);

  const updateSong = (song: Music) => {
    setCurrentSong(song);
  };

  const values = {
    currentSong,
    updateSong,
    currentSongArray,
    setCurrentSongArray,
    setPlaying,
    playing,
    setTrackIndex,
    trackIndex,
    setCurrentSong,
    originalSongArray,
    setOriginalSongArray,
    queueTitle,
    setQueueTitle,
  };
  return <MusicPlayerContext.Provider value={values}>{props.children}</MusicPlayerContext.Provider>;
};

export default MusicPlayerProvider;
