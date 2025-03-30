import { EquityTable, RankingTable } from "./tables";
import ButtonArea from "./buttonArea";

const Ranking = () => {
  return (
    <div className="h-1/2 flex flex-row gap-8 m-4">
      <div className="w-1/2">
        <RankingTable />
      </div>
      <div className="w-1/2">
        <EquityTable />
        <ButtonArea />
      </div>
    </div>
  );
};

export default Ranking;
