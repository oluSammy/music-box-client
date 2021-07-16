import React, { ReactNode, createContext, useState, SetStateAction, Dispatch } from 'react';
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
  timestamp?: string;
  album?: string;
}

interface MusicContext {
  currentSong: Music | null;
  updateSong: (song: Music) => void;
  currentSongArray: Music[];
  setCurrentSongArray: Dispatch<SetStateAction<Music[]>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setTrackIndex: Dispatch<SetStateAction<number>>;
  playing: boolean;
  trackIndex: number;
  setCurrentSong: Dispatch<SetStateAction<Music | null>>;
  originalSongAray: Music[];
  setOriginalSongAray: Dispatch<SetStateAction<Music[]>>;
  queueTitle: string;
  recentlyPlayed: string;
  setRecentlyPlayed: Dispatch<SetStateAction<string>>;
}
export const MusicPlayerContext = createContext({} as MusicContext);

const MusicPlayerProvider = (props: Props) => {
  const [currentSong, setCurrentSong] = useState<Music | null>(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState('');
  const [currentSongArray, setCurrentSongArray] = useState([] as Music[]);
  const [originalSongAray, setOriginalSongAray] = useState([] as Music[]);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [queueTitle, setQueueTitle] = useState('');

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
    originalSongAray,
    setOriginalSongAray,
    queueTitle,
    setQueueTitle,
    recentlyPlayed,
    setRecentlyPlayed,
  };
  return <MusicPlayerContext.Provider value={values}>{props.children}</MusicPlayerContext.Provider>;
};

export default MusicPlayerProvider;
