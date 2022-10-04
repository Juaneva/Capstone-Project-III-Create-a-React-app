import './App.css';
import Hangman from './components/Hangman';
import Help from './components/Help';

/*Display the Hangman game and Help button*/
function App() {
  return (
    <div className="App">
      <h1><u>Hangman</u></h1>
      <br/>
      <Hangman/> 
      <Help/> 
      <br/><br/>    
    </div>
  );
}

export default App;
