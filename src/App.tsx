import './styles/App.css';
import Header from './components/Header/Header';
import Button from './ui/Button/Button';
import AuthProvider from './context/AuthContext';
function App() {
  const name = {
    age: 1,
  };
  return (
    <AuthProvider>
      <div className='App'>
        <Header />

        <h1>Welcome to music box, {name.age}</h1>
        <Button />
      </div>
    </AuthProvider>
  );
}

export default App;
