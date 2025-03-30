import { DragEvent } from "react";
import { deckActions } from "../../store/deckSlice";
import { removeCardAsync, validateAsync } from "../../store/asyncActions";
import { usePokerDispatch } from "../../store/hooks";
import { Card as CardProps } from "../../types";
import C from "./constants";

const Card = ({ suit, value, index, isSelected, isInTable }: CardProps) => {
  const dispatch = usePokerDispatch();

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const handleClick = () => {
    dispatch(deckActions.updateDeck({ cardIndex: index, isSelected: false }));
    dispatch(removeCardAsync({ cardIndex: index })).then(() => {
      dispatch(validateAsync());
    });
  };

  const opacity = isSelected ? C.OPACITY : C.NO_OPACITY;
  const isClickable = isInTable && C.CLICKABLE;
  const background = C.BG_COLOR[suit];
  const text = C.TEXT_COLOR[suit];
  const symbol = C.SUIT_SYMBOL[suit];

  return (
    <>
      <div
        id={index.toString()}
        draggable={!isSelected && !isInTable}
        onDragStart={handleDragStart}
        className={`group relative w-9.75 h-13 flex flex-col px-0.5 border-2 border-white text-white rounded-sm skew-x-0
          ${background} ${opacity} ${text}`}
      >
        <div className="text-[8px] text-left">{value}</div>
        <div className={`text-md text-center ${symbol}`} />
        <div className="text-[8px] rotate-180">{value}</div>
        <div
          onClick={handleClick}
          className={`hidden absolute inset-0 items-center justify-center
           bg-black/70 text-lg cursor-pointer rounded-sm ${isClickable} ${text}`}
        >
          X
        </div>
      </div>
    </>
  );
};

export default Card;
