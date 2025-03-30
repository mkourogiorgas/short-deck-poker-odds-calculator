import { usePokerSelector } from "../../store/hooks";
import Card from "../card";

const Deck = () => {
  const deck = usePokerSelector((state) => state.deck);
  return (
    <div className="grid grid-cols-4 grid-rows-9 gap-2 mx-auto p-5 bg-white rounded-lg ">
      {deck.map(({ suit, value, index, isSelected }) => {
        return (
          <Card
            key={index}
            suit={suit}
            value={value}
            index={index}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};

export default Deck;
