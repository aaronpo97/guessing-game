import './App.scss';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import Card from './types/Card';

const emojis: string[] = ['🍍', '🥝', '🍉', '🍎', '🍑', '🍓', '🍌', '🍇'];

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
    if (!(choiceOne && choiceTwo)) {
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

  return (
    <div className='App'>
      <h1>Fruit Memory Match</h1>
      <button disabled={disabled} onClick={shuffleCards}>
        New Game
      </button>
      <main>
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
        <div className='game-score'>
          <p>Turns: {turns}</p>
        </div>
      </main>
      <footer>
        <p>created by Aaron William Po</p>
      </footer>
    </div>
  );
};

export default App;
