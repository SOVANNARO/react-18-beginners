interface Props {
  cardItems: string[];
  onClear: () => void;
}

function Card({ cardItems, onClear }: Props) {
  return (
    <div>
      {cardItems.map((cardItem) => (
        <div key={cardItem}>{cardItem}</div>
      ))}
      <button onClick={onClear}>Clear</button>
    </div>
  );
}

export default Card;
