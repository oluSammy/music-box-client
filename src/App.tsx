import './styles/App.css';
import Header from './pages/Header/Header';
import Button from "./ui/Button/Button"
function App() {
  const name = {
    "age": 1
  }
  return (

    <div className="App"> 
                            <Header />
    
    
          <h1>Welcome to music box, {name.age}
          
          </h1>
    <Button />
    </div>
  );
}

export default App;
