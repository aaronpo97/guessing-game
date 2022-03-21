import './App.scss';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import Card from './types/Card';

const emojis: string[] = ['🍍', '🥝', '🍉', '🍎', '🍑', '🍓'];

const cardContent: Card[] = emojis.map((emoji): Card => ({ emoji, matched: false }));

const App = (): JSX.Element => {
  const [cards, setCards] = useState<Card[] | null>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const shuffleCards = (): void => {
    const shuffledCards = [...cardContent, ...cardContent]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.floor(Math.random() * 10000000) }));

    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card: Card) => (choiceOne ? setChoiceTwo(card) : setChoiceOne(card));

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.emoji === choiceTwo.emoji) {
        setCards((prevCards) => {
          return (prevCards as Card[]).map((card) => {
            if (card.emoji === choiceOne.emoji) {
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

  useEffect(() => shuffleCards(), []);

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      {cards && (
        <div className='card-grid'>
          {cards.map((card) => (
            <SingleCard
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      )}
      <p>Turns: {turns}</p>
    </div>
  );
};

export default App;
