import './SingleCard.scss';
import Card from '../types/Card';

type PropTypes = {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
};

const SingleCard = ({ card, handleChoice, flipped, disabled }: PropTypes): JSX.Element => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <div className='front content'>{card.emoji}</div>
        <div className='back content' onClick={handleClick} />
      </div>
    </div>
  );
};

export default SingleCard;
