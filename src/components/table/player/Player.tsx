import CardSlot from "../cardSlot";
import { Hand } from "../../../types";
import C from "./constants";

type PlayerProps = {
  player: Hand;
  position: string;
};

const Player = ({ player, position }: PlayerProps) => {
  return (
    <div className="flex-col">
      <div className="flex flex-row m-2">
        {player.map((card, index) => (
          <CardSlot
            key={index}
            position={position}
            slotIndex={index}
            cardIndex={card.index}
          />
        ))}
      </div>
      <p className="text-ts text-white text-center font-sans font-medium ">
        {C.PLAYER_NAME[position]}
      </p>
    </div>
  );
};

export default Player;
