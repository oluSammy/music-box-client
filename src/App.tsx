import React from 'react';
import './styles/App.css';
import Routes from './routes/routes';
import AuthProvider from './context/AuthContext';
import { useLocation } from 'react-router-dom';
import MusicPlayerProvider from './context/MusicPlayerContext';
import Player from './components/Player/Player';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import NavigationBar from './components/Navbar/Navbar';
import TemporaryDrawer from './components/MobileHomeNav/HomeMobileNav';
import useCurrentWidth from './hooks/use-getMobileView';
import SearchInputBox from './components/SearchBox/SearchBox';
function App() {
  const location = useLocation();
  const screenWidth = useCurrentWidth();

  return (
    <AuthProvider>
      <MusicPlayerProvider>
        <div className='App'>
          {location.pathname.split('/').filter(Boolean).length !== 0 && screenWidth <= 999 && <SearchInputBox />}
          {location.pathname.split('/').filter(Boolean).length !== 0 &&
            (screenWidth <= 999 ? <TemporaryDrawer /> : <NavigationBar />)}
          <Routes />
          {location.pathname.split('/').filter(Boolean).length > 0 && <Player />}
        </div>
      </MusicPlayerProvider>
    </AuthProvider>
  );
}

export default App;
