import { evaluateTable, getWinners } from "./evaluation";
import U from "./utils";
import { FrequencyCounter, Hand, Players, Results } from "../../types";

const getResults = (
  communityCombinations: Hand[],
  players: Players
): Results => {
  const winners: FrequencyCounter = {};
  const ties: FrequencyCounter = {};
  const ranking: FrequencyCounter = {};
  const rounds: FrequencyCounter = {};

  for (const community of communityCombinations) {
    const tableEvaluation = evaluateTable(community, players);
    const roundWinners = getWinners(tableEvaluation);
    U.updateFrequencyCounter(ranking, tableEvaluation.hero.name);

    if (roundWinners.length === 1) {
      U.updateFrequencyCounter(winners, roundWinners[0]);
    } else {
      for (const winner of roundWinners) {
        U.updateFrequencyCounter(ties, winner);
      }
    }
    U.updateFrequencyCounter(rounds, "total");
  }

  return { winners, ties, ranking, rounds };
};

const mergeResults = (data: Results[], activeVillains: number): Results => {
  return data.reduce(
    (accumulator, chunk) => {
      for (const [key, value] of Object.entries(chunk.winners)) {
        accumulator[key === "hero" ? "hero" : "villain"].wins =
          (accumulator[key === "hero" ? "hero" : "villain"].wins || 0) + value;
      }

      for (const [key, value] of Object.entries(chunk.ties)) {
        accumulator[key === "hero" ? "hero" : "villain"].ties =
          (accumulator[key === "hero" ? "hero" : "villain"].ties || 0) +
          value / activeVillains;
      }

      for (const [key, value] of Object.entries(chunk.ranking)) {
        accumulator.ranking[key] = (accumulator.ranking[key] || 0) + value;
      }

      for (const [key, value] of Object.entries(chunk.rounds)) {
        accumulator.rounds[key] = (accumulator.rounds[key] || 0) + value;
      }

      return accumulator;
    },
    {
      hero: { wins: 0, ties: 0 },
      villain: { wins: 0, ties: 0 },
      ranking: {},
      rounds: { total: 0 },
    }
  );
};

export { getResults, mergeResults };
