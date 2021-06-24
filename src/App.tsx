import React from 'react';
import './styles/App.css';
import Routes from './routes/routes';
import AuthProvider from './context/AuthContext';
import MusicPlayerProvider from "./context/MusicPlayerContext"
import Player from "./components/Player/Player";
function App() {
  return (
    <AuthProvider>
      <MusicPlayerProvider>
      <div className='App'>
        <Routes />
        <Player />
      </div>
      </MusicPlayerProvider>
    </AuthProvider>
  );
}

export default App;
