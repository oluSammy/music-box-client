import React from 'react';
import './styles/App.css';
import Routes from './routes/routes';
import AuthProvider from './context/AuthContext';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import NavigationBar from './components/Navbar/Navbar';

function App() {

  return (
    <AuthProvider>
      <div className='App'>
        <NavigationBar />
        <Routes />
      </div>
    </AuthProvider>
  );
}

export default App;
