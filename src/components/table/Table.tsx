import { usePokerSelector } from "../../store/hooks";
import Community from "./community";
import Player from "./player";

const Table = () => {
  const table = usePokerSelector((state) => state.table);
  return (
    <div className="bg-center bg-no-repeat mx-auto bg-[url('../../../public/img/table.svg')]">
      <div className="grid grid-cols-3 grid-rows-3 gap-10 mx-auto place-items-center w-100 h-70 ">
        {Object.keys(table).map((position) => {
          if (position !== "community")
            return (
              <Player
                player={table[position]}
                position={position}
                key={position}
              />
            );
        })}
        <Community community={table.community} />
      </div>
    </div>
  );
};

export default Table;
