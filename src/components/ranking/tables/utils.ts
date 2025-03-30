import C from "./constants";
import { Results } from "../../../types";

const getPercentage = (value: number, totalValue: number): string => {
  return totalValue ? ((value / totalValue) * 100).toFixed(2) + "%" : "0%";
};

const updateEquityTable = ({ hero, villain, rounds: { total } }: Results) => {
  const updatedTable = C.EQUITY_TABLE.slice();
  if (!total) {
    return updatedTable;
  }

  return [
    ...C.EQUITY_TABLE.slice(0, 3),
    getPercentage(hero.wins, total),
    C.EQUITY_TABLE[4],
    getPercentage(villain.wins, total),
    getPercentage(hero.ties, total),
    C.EQUITY_TABLE[7],
    getPercentage(villain.ties, total),
    `Total community combinations: ${total}`,
  ];
};

const updateRankingTable = (results: Results) => {
  const {
    ranking,
    rounds: { total },
  } = results;
  const rankingTable = { ...C.RANKING_TABLE };
  if (!total) {
    return rankingTable;
  }
  Object.keys(ranking).forEach((key) => {
    rankingTable[key] = getPercentage(ranking[key], total);
  });
  return rankingTable;
};

export default { updateEquityTable, updateRankingTable };
