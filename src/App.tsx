import React from 'react';
import './styles/App.css';
import UserProfile from './pages/UserProfile/UserProfile';
// import RecentlyPlayed from './pages/RecentlyPlayed/RecentlyPlayed';
import Routes from './routes/routes';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* <div className='App'> */}
      <UserProfile />
      {/* <RecentlyPlayed /> */}
      <Routes />
      {/* </div> */}
    </AuthProvider>
  );
}

export default App;
