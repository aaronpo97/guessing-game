import './SingleCard.scss';
import Card from '../types/Card';

type PropTypes = {
  card: Card;
  disabled: boolean;
  flipped: boolean;
  handleChoice: (card: Card) => void;
};

const SingleCard = ({ card, disabled, flipped, handleChoice }: PropTypes): JSX.Element => {
  const handleClick = (): void => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : 'unflipped'}>
        <div className='front content'>{card.emoji}</div>
        <div className='back content' onClick={handleClick} />
      </div>
    </div>
  );
};

export default SingleCard;
