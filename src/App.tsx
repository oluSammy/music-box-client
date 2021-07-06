import React from 'react';
import './styles/App.css';
import Routes from './routes/routes';
import AuthProvider from './context/AuthContext';
import MusicPlayerProvider from './context/MusicPlayerContext';
import Player from './components/Player/Player';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import NavigationBar from './components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';
function App() {
  const { pathname } = useLocation();
  return (
    <AuthProvider>
      <MusicPlayerProvider>
        <div className='App'>
          <NavigationBar />
          <Routes />
          {pathname.split('/').filter(Boolean).length > 0 && <Player />}
        </div>
      </MusicPlayerProvider>
    </AuthProvider>
  );
}

export default App;
