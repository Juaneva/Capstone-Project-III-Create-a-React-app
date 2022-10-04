import React,{useState} from 'react';

// Import words from a dictionary in txt
import dictionary from './words/dictionary.txt';

// Import Hangman images and guess word and use props to control the display
import DisplayHangmanImage from './DisplayHangmanImage';
import DisplayGuessWord from './DisplayGuessWord';


function Hangman() {

    // Declare correct letters & incorrect letters
    const[correctLetter,setCorrectLetter] = useState(0);
    const[wrongLetter,setWrongLetter] = useState(0);

    // Declare amount of games won and lost
    const[wonGame,setWonGame] = useState(0);
    const[lostGame,setLostGame] = useState(0);

    // Guess Word array 
    const[guessWordEasy,setGuessWordEasy] = useState([]);

    // Displayed if the player lost the game
    const[displayGuessWordEasyString,setDisplayGuessWordEasyString] = useState(false);
    const[guessWordEasyString,setGuessWordEasyString] = useState([]);

    // Declare state to not show alphabet and letters of alphabet status to 0
    const[displayAlphabetButtons,setDisplayAlphabetButtons] = useState(false);
    const[alphabet,setAlphabet] = useState([
        {letter:"a", status:0},
        {letter:"b", status:0},
        {letter:"c", status:0},
        {letter:"d", status:0},
        {letter:"e", status:0},
        {letter:"f", status:0},
        {letter:"g", status:0},
        {letter:"h", status:0},
        {letter:"i", status:0},
        {letter:"j", status:0},
        {letter:"k", status:0},
        {letter:"l", status:0},
        {letter:"m", status:0},
        {letter:"n", status:0},
        {letter:"o", status:0},
        {letter:"p", status:0},
        {letter:"q", status:0},
        {letter:"r", status:0},
        {letter:"s", status:0},
        {letter:"t", status:0},
        {letter:"u", status:0},
        {letter:"v", status:0},
        {letter:"w", status:0},
        {letter:"x", status:0},
        {letter:"y", status:0},
        {letter:"z", status:0},
        {letter:"-", status:0},
    ]);

    // Create the Guess Word display by using one of the words from the dictionary
    function createGuessWord(){

        // Fetch the dictionary txt file
        fetch(dictionary).then(r => r.text()).then(text => {
            
            // Create an array of words from the list
            let newRandomGuessWord = text.split('\n');
                
            // Get the number of words in the array
            const arrayLength = newRandomGuessWord.length;
                        
            // Select a random up to arraylength -1
            let randomNumber = Math.floor((Math.random() * (arrayLength)) );
    
            // convert word to lower case
            const randomSelectedWord  = newRandomGuessWord[randomNumber].toLowerCase();
    
            // Split the word into an array
                const randomSelectedWordSplit = randomSelectedWord.split("");
    
            // use status to change the array to Array of objects
            randomSelectedWordSplit.forEach((element, index) => {                   
                randomSelectedWordSplit[index] = {letter:element, status:0} 
            })
            // Set the Word that the user is going to guess
            setGuessWordEasy(randomSelectedWordSplit) 
            
            // Console.log for testing purposes
            console.log(randomSelectedWord)

            // Set to display word if user loses the game
            setGuessWordEasyString(randomSelectedWord)
        });       
    }
    
    // Display the letters that the user can click on
    function displayAlphabet(alphabet){
        return(
            <div>
                {alphabet.map((element, index) => {
                    if (element.status === 0) {
                    return <button className={"alphabet-"+element.status} key={index} onClick={()=>{changeStatus(element.letter) }}>{element.letter}</button>;
                    }
                    return <button className={"alphabet-"+element.status} key={index} >{element.letter}</button>;
                })}
            </div>
        )
    }

    // Check if the user selected incorrect or correct letter & update
    function changeStatus(selectedLetter){

        // Declare the letter as false, change to true if the letter is correct
        let correct = false;

        // See if the letter is found, update correct letter, update GuessWord status where letter is located
        guessWordEasy.forEach((element, index) => {
            if (element.letter === selectedLetter) {
                correct = true             
                guessWordEasy[index] = {letter:selectedLetter, status:1}
            }
        })

        // set Guess Word
        setGuessWordEasy(guessWordEasy);
        
        let position =alphabet.findIndex(obj => obj.letter === selectedLetter);
           
        if(correct){
            alphabet[position] = {letter:selectedLetter, status:1};
            setCorrectLetter(correctLetter+1)
        } else{
            alphabet[position] = {letter:selectedLetter, status:2};
            
            let wrongSelectedLetter = wrongLetter+1
            
            setWrongLetter(wrongSelectedLetter)
            if(wrongSelectedLetter === 10){
                setLostGame(lostGame+1)
                setDisplayGuessWordEasyString(true)
                setDisplayAlphabetButtons(false)
            }
        }

        // Check if the user won the game
        let correctLetterCount = 0;
        guessWordEasy.forEach((element) => {
            if (element.status === 1) {
                correctLetterCount++;
            }
        })
            
        if(correctLetterCount === guessWordEasy.length){
            setWonGame(wonGame+1)
            setWrongLetter("won")
            setDisplayAlphabetButtons(false)
        }
        
        // Set alphabet with the new alphabet status
        setAlphabet(alphabet)
    }
 
    // START / RESTART the Game
    function restartGame(){

        // Set the status of Each of the alphabet letters to 0
        alphabet.forEach((element, index) => {                   
            alphabet[index] = {letter:element.letter, status:0} 
        })
        // Set Alphabet, status 0 for all letters. Hide guess word if the user lost the previous round. Display alphabet.
        setAlphabet(alphabet)
        setDisplayGuessWordEasyString(false)
        setDisplayAlphabetButtons(true)

        // Reset the correct letters and incorrect letters to 0
        setCorrectLetter(0)
        setWrongLetter(0)

        // Create a new word to guess
        createGuessWord()
    }

  return (
    <div>   
        <DisplayHangmanImage status = {wrongLetter}/>
        <h2 className='guessWordDisplay'>
            <DisplayGuessWord guessWordEasy={guessWordEasy}/>
        </h2>
        {displayGuessWordEasyString?guessWordEasyString:null}
        <h3>
            {displayAlphabetButtons?displayAlphabet(alphabet):null}
        </h3>
        <h2>
            <span> WON: {wonGame} | </span>
            <span> LOST: {lostGame}</span>
        </h2>
        <button onClick={()=>{restartGame()}} >START/RESET GAME</button>  
    </div>
  )
}

export default Hangman