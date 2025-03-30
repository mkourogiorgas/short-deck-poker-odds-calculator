import { useState, DragEvent } from "react";
import { deckActions } from "../../../store/deckSlice";
import { updateTableAsync, validateAsync } from "../../../store/asyncActions";
import { usePokerDispatch, usePokerSelector } from "../../../store/hooks";
import cardSlot from "../../../../public/img/cardSlot.png";
import C from "./constants";

type EmptyCardSlotProps = {
  position: string;
  slotIndex: number;
};

const EmptyCardSlot = ({ position, slotIndex }: EmptyCardSlotProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const validation = usePokerSelector((state) => state.validation);
  const deck = usePokerSelector((state) => state.deck);
  const dispatch = usePokerDispatch();

  const handleDrop = async (event: DragEvent) => {
    event.preventDefault();
    const cardIndex = +event.dataTransfer.getData("text/plain");
    dispatch(deckActions.updateDeck({ cardIndex, isSelected: true }));
    dispatch(
      updateTableAsync({ position, slotIndex, card: deck[cardIndex] })
    ).then(() => {
      dispatch(validateAsync());
    });
  };

  const handleLeave = (event: DragEvent) => {
    event.preventDefault();
    setIsHovered(false);
  };

  const handleOver = (event: DragEvent) => {
    event.preventDefault();
    setIsHovered(true);
  };

  const isValid = validation[position][slotIndex];
  const border = isHovered ? C.GREEN_BORDER : !isValid ? C.RED_BORDER : "";

  return (
    <div onDrop={handleDrop} onDragLeave={handleLeave} onDragOver={handleOver}>
      <img
        className={`${border} min-w-9 rounded-sm`}
        src={cardSlot}
        alt="EmptyCardSlot"
      />
    </div>
  );
};

export default EmptyCardSlot;
