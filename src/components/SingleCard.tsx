import './SingleCard.scss';
import Card from '../types/Card';

type PropTypes = {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
};

export default function SingleCard({ card, handleChoice, flipped, disabled }: PropTypes) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <div className='front content'>{card.emoji}</div>
        <div className='back content' onClick={handleClick}>
          back
        </div>
      </div>
    </div>
  );
}
