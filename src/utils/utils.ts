import { useQuery } from 'react-query';
import axios from 'axios';

export function secondsToHms(d: number) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? ' hr ' : ' hrs ') : '';
  var mDisplay = m > 0 ? m + (m === 1 ? ' m ' : ' m ') : '';
  var sDisplay = s > 0 ? s + (s === 1 ? ' s' : ' s') : '';
  return hDisplay + mDisplay + sDisplay;
}

/**
 * custom hook for fetching data
 * @param key unique identifier for query
 * @param queryUrl query route, base url has been specified
 * @param token optional user token to access protected route
 * @returns an observers for isLoading, error and data
 */

export const useFetch = (key: string, queryUrl: string, token?: string) => {
  return useQuery(
    key,
    async () => {
      const response = await axios({
        method: 'get',
        url: `https://music-box-b.herokuapp.com/api/v1/music-box-api/${queryUrl}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
    {
      refetchOnWindowFocus: false, // prevents background data refetch when browser / window is refocused
    }
  );
};
