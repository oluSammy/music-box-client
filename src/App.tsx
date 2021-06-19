import React from 'react';
import './styles/App.css';
import Header from './components/Header/Header';
import Routes from './routes/routes';
import AuthProvider from './context/AuthContext';
function App() {
  const name = {
    age: 1,
  };
  return (
    <AuthProvider>
      <div className='App'>
        <Header />
        <Routes />
        <h1>Welcome to music box, {name.age}</h1>
      </div>
    </AuthProvider>
  );
}

export default App;
