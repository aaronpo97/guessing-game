import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
const cardImages = [
   { src: '/img/helmet-1.png', matched: false },
   { src: '/img/potion-1.png', matched: false },
   { src: '/img/ring-1.png', matched: false },
   { src: '/img/scroll-1.png', matched: false },
   { src: '/img/shield-1.png', matched: false },
   { src: '/img/sword-1.png', matched: false },
];

function App() {
   // shuffle cards
   // two of each card, randomize cards using sort method
   // apply random id for each card for the key prop
   const [cards, setCards] = useState([]);
   const [turns, setTurns] = useState(0);
   const [choiceOne, setChoiceOne] = useState(null);
   const [choiceTwo, setChoiceTwo] = useState(null);
   const [disabled, setDisabled] = useState(false);
   const shuffleCards = () => {
      const shuffledCards = [...cardImages, ...cardImages]
         .sort(() => Math.random() - 0.5)
         .map(card => ({ ...card, id: Math.floor(Math.random() * 10000000) })); //two of each card

      setChoiceOne(null);
      setChoiceTwo(null);

      setCards(shuffledCards);
      setTurns(0);
   };

   // handle a choice
   const handleChoice = card => (choiceOne ? setChoiceTwo(card) : setChoiceOne(card));

   const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(prevTurns => prevTurns + 1);
      setDisabled(false);
   };

   /* 
   once we have two choices selected, check of those two choices match

   fire code when choices are made to evaluate those choiuces and check using the src prop cus they are the same

   only prfrm eval when we haave value for choice one and choice two

   log result to console

   when compared fire the resetTurn func 


   ideas: maybe use useEffect? 
   */

   useEffect(() => {
      if (choiceOne && choiceTwo) {
         setDisabled(true);
         if (choiceOne.src === choiceTwo.src) {
            setCards(prevCards => {
               return prevCards.map(card => {
                  if (card.src === choiceOne.src) {
                     return { ...card, matched: true };
                  } else {
                     return card;
                  }
               });
            });
            resetTurn();
         } else {
            setTimeout(() => resetTurn(), 1000);
         }
      }
   }, [choiceOne, choiceTwo]);

   // start a new game automatically

   useEffect(() => {
      shuffleCards();
   }, []);

   return (
      <div className='App'>
         <h1>Magic Match</h1>
         <button onClick={shuffleCards}>New Game</button>

         <div className='card-grid'>
            {cards.map(card => (
               <SingleCard
                  card={card}
                  key={card.id}
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
               />
            ))}
         </div>
         <p>Turns: {turns}</p>
      </div>
   );
}

export default App;
