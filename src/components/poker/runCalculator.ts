import { mergeResults } from "./results";
import U from "./utils";
import { Hand, Players, Results } from "../../types";

const runPokerOdds = async (deck: Hand, players: Players): Promise<Results> => {
  const community = players.community.filter((card) => card.index !== -1);
  const communities = U.getCommunityCombinations(deck, community);
  const activePlayers = U.getActivePlayers(players);
  const activeVillains = Object.keys(activePlayers).length - 1;
  const chunks = U.splitArrayToChunks(
    communities,
    Math.ceil(communities.length / 4)
  );

  const splitResults = await Promise.all(
    chunks.map((chunk) => U.runWorker(chunk, activePlayers))
  );
  const results = mergeResults(splitResults, activeVillains);
  return results;
};

export { runPokerOdds };
