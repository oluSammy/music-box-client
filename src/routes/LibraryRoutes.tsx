import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';

const AlbumLibrary = lazy(() => import('../pages/Library/Album/Album'));
const ArtistLibrary = lazy(() => import('../pages/Library/Artist/Artist'));
const PlaylistLibrary = lazy(() => import('../pages/Library/Playlist/Playlist'))

const Library = () => {
  return (
    <>
      <Route
        path='/:parent/album'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <AlbumLibrary />
          </Suspense>
        )}
      />
      <Route
        path='/:parent/artist'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <ArtistLibrary />
          </Suspense>
        )}
      />
      <Route
        path='/:parent/playlist'
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <PlaylistLibrary />
          </Suspense>
        )}
      />
    </>
  );
};
export default Library;
