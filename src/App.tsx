import './App.scss';
import { useState, useEffect } from 'react';
import SingleCard from './components/Card/SingleCard';
import Card from './types/Card';

const emojis: string[] = ['🍍', '🥝', '🍉', '🍎', '🍑', '🍓', '🍌', '🍇'];

const cardContent: Card[] = emojis.map((emoji): Card => ({ emoji, matched: false }));

const App = (): JSX.Element => {
  const [cards, setCards] = useState<Card[] | null>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const shuffleCards = (): void => {
    const shuffledCards = [...cardContent, ...cardContent]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

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
    if (!(choiceOne && choiceTwo) || choiceOne.id === choiceTwo.id) {
      return;
    }
    setDisabled(true);
    if (choiceOne.emoji !== choiceTwo.emoji) {
      setTimeout(() => resetTurn(), 1000);
      return;
    }
    setCards((prevCards) =>
      (prevCards as Card[]).map((card) =>
        card.emoji === choiceOne.emoji ? { ...card, matched: true } : card,
      ),
    );

    resetTurn();
  }, [choiceOne, choiceTwo]);

  useEffect(() => shuffleCards(), []);

  useEffect(() => {
    const unmatchedCards = cards?.filter((card) => card.matched === false);
    if (!unmatchedCards) {
      setGameOver(true);
    }
  }, [turns]);
  return (
    <div className='App'>
      <h1>Fruit Memory Match</h1>
      <main>
        <div className='status'>
          <button disabled={disabled} onClick={shuffleCards}>
            {!disabled ? 'New Game' : 'Loading...'}
          </button>
        </div>

        <div className='game-container'>
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
        </div>

        <div className='status'>
          <div className='game-controls'>
            <div className='game-score'>
              <h2>Turns: {turns}</h2>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <code>created by Aaron William Po</code>
      </footer>
    </div>
  );
};

export default App;
