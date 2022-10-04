import React from 'react'

   //Display the word that the user must guess
   function DisplayGuessWord(props){
    // Use Props to determine display of letters
    let guessWordEasy = props.guessWordEasy
    return(
        <span>
            {guessWordEasy.map((element, index) => {
                if (element.status === 0) {
                return <span key={index}> _ </span>;
                }
                return <span key={index}>{element.letter}</span>;
            })}     
        </span>
    )
}

export default DisplayGuessWord