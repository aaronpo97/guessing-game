import './SingleCard.scss';
import ICard from '../../types/Card';

type PropTypes = {
  card: ICard;
  disabled: boolean;
  flipped: boolean;
  handleChoice: (card: ICard) => void;
};

const SingleCard = ({ card, disabled, flipped, handleChoice }: PropTypes): JSX.Element => {
  const handleClick = (): void => {
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
