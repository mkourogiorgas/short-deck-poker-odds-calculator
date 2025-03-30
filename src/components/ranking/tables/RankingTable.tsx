import { Fragment, useMemo } from "react";
import { usePokerSelector } from "../../../store/hooks";
import U from "./utils";
import C from "./constants";

const RankingTable = () => {
  const results = usePokerSelector((state) => state.results);
  const rankingTable = useMemo(() => U.updateRankingTable(results), [results]);

  const getFontStyle = (index: number, isValue: boolean) => `
    ${isValue ? C.TEXT_COLOR.HERO : C.TEXT_COLOR.BLACK} 
    ${index > 0 ? C.FONT_SIZE.SMALL : C.FONT_SIZE.XLARGE} 
    text-center font-sans font-medium
  `;

  return (
    <div className="grid grid-cols-2 grid-rows-11 place-items-center bg-white p-2 rounded-lg">
      {Object.keys(rankingTable).map((key, index) => (
        <Fragment key={key}>
          <div className={getFontStyle(index, false)}>{key}</div>
          <div className={getFontStyle(index, true)}>{rankingTable[key]}</div>
        </Fragment>
      ))}
    </div>
  );
};

export default RankingTable;
