import { mergeResults } from "./results";
import U from "./utils";
import { Hand, Players, Results } from "../../types";

const runPokerOdds = async (deck: Hand, table: Players): Promise<Results> =>
  new Promise((resolve) => {
    const community = table.community.filter((card) => card.index !== -1);
    const communities = U.getCommunityCombinations(deck, community);
    const players = U.filterActivePlayers(table);
    const [split1, split2, split3, split4] = U.splitArrayToChunks(
      communities,
      communities.length / 4
    );
    Promise.all([
      U.runWorker(split1, players),
      U.runWorker(split2, players),
      U.runWorker(split3, players),
      U.runWorker(split4, players),
    ]).then((splitResults: Results[]) => {
      const activeVillains = Object.keys(players).length - 1;
      const results = mergeResults(splitResults, activeVillains);
      resolve(results);
    });
  });

export { runPokerOdds };
