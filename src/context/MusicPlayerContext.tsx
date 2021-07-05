import React, { ReactNode, useEffect, createContext, useState, SetStateAction, Dispatch } from 'react';
import axios from 'axios';
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
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setTrackIndex: Dispatch<SetStateAction<number>>;
  playing: boolean;
  trackIndex: number;
  setCurrentSong: Dispatch<SetStateAction<Music | null>>;
  originalSongAray: Music[];
  setOriginalSongAray: Dispatch<SetStateAction<Music[]>>;
  queueTitle: string;
}
export const MusicPlayerContext = createContext({} as MusicContext);
// const previewArr = [
//   'https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-8.mp3',
//   'https://cdns-preview-0.dzcdn.net/stream/c-02585dc790f2904c4e870cb3bcecfcf3-8.mp3',
//   'https://cdns-preview-8.dzcdn.net/stream/c-8685b5521c65a78c255346731a6405a6-8.mp3',
//   'https://cdns-preview-3.dzcdn.net/stream/c-3a4e6b7e92684d27b882f95d1a1feaac-4.mp3',
// ];

const MusicPlayerProvider = (props: Props) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwY2I0Mjk0ZDc4OGM4MDAxNTI3YjE5OCIsImlhdCI6MTYyNTMxMTYyNCwiZXhwIjoxNjI1NDg0NDI0fQ.ithxsvaE9jPH5piJhL8TbnE28x4SG_CwHDcKhdSHV2I';
  const [currentSong, setCurrentSong] = useState<Music | null>(null);
  const [currentSongArray, setCurrentSongArray] = useState([] as Music[]);
  const [originalSongAray, setOriginalSongAray] = useState([] as Music[]);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [queueTitle, setQueueTitle] = useState('');
  useEffect(() => {
    console.log('I loaded');
    const fetchTracks = async () => {
      try {
        const url = 'https://music-box-b.herokuapp.com/api/v1/music-box-api/album?album=302127';
        const {
          data: {
            data: { result },
          },
        } = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
        const { tracks } = await result;
        console.log(result);
        setQueueTitle(result.title);
        // const songArray = tracks.map((h: Music, i: number) => ({ ...h, preview: previewArr[i] }))
        setCurrentSongArray(tracks);
        setOriginalSongAray(tracks);
        console.log('array', tracks);
        setCurrentSong(tracks[0]);
        // console.log('currSong', tracks[0], currentSong);
      } catch (e) {
        console.log('e', e);
      }
    };
    fetchTracks();
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
    originalSongAray,
    setOriginalSongAray,
    queueTitle,
  };
  return <MusicPlayerContext.Provider value={values}>{props.children}</MusicPlayerContext.Provider>;
};

export default MusicPlayerProvider;
