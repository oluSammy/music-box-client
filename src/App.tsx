import React from 'react';
import './styles/App.css';
import Routes from './routes/routes';
import AuthProvider from './context/AuthContext';
function App() {
  return (
    <AuthProvider>
      <div className='App'>

        <Routes />

      </div>
    </AuthProvider>
  );
}

export default App;
