import { usePokerSelector } from "../../../store/hooks";
import Card from "../../card/Card";
import EmptyCardSlot from "./EmptySlot";

type CardSlotProps = {
  position: string;
  slotIndex: number;
  cardIndex: number;
};

const CardSlot = ({ position, slotIndex, cardIndex }: CardSlotProps) => {
  const deck = usePokerSelector((state) => state.deck);
  const card = deck[cardIndex];
  let Slot;

  if (card) {
    Slot = (
      <Card
        suit={card.suit}
        value={card.value}
        index={card.index}
        isSelected={false}
        isInTable
      />
    );
  } else {
    Slot = <EmptyCardSlot position={position} slotIndex={slotIndex} />;
  }

  return (
    <div className="w-9.75 h-13 m-0.5 border-[#21617F] rounded-sm">{Slot}</div>
  );
};

export default CardSlot;
