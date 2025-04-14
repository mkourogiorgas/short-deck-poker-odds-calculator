import { Hand, FrequencyCounter, Players, Results } from "../../types";

const getCombinations = (
  cards: Hand,
  size: number,
  start = 0,
  combo: Hand = [],
  result: Hand[] = []
): Hand[] => {
  if (combo.length === size) {
    result.push([...combo]);
    return result;
  }

  for (let i = start; i < cards.length; i++) {
    combo.push(cards[i]);
    getCombinations(cards, size, i + 1, combo, result);
    combo.pop();
  }

  return result;
};

const getCommunityCombinations = (deck: Hand, community: Hand): Hand[] => {
  if (community.length === 5) {
    return [community];
  }
  const remainingDeck = deck.filter((card) => !card.isSelected);
  const missingCards = 5 - community.length;
  const combinations = getCombinations(remainingDeck, missingCards);
  return community.length
    ? combinations.map((combination) => [...community, ...combination])
    : combinations;
};

const splitArrayToChunks = (communities: Hand[], size: number): Hand[][] => {
  const chunks: Hand[][] = [];
  for (let i = 0; i < communities.length; i += size) {
    chunks.push(communities.slice(i, i + size));
  }
  return chunks;
};

const updateFrequencyCounter = (
  object: FrequencyCounter,
  key: string
): void => {
  object[key] = (object[key] || 0) + 1;
};

const getActivePlayers = (table: Players): Players => {
  const players: Players = {};
  Object.entries(table).filter(([key, value]) => {
    if (value.length === 2 && value[0].index !== -1) {
      players[key] = value;
    }
  });
  return players;
};

const runWorker = (communities: Hand[], players: Players): Promise<Results> =>
  new Promise((resolve) => {
    const worker = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });
    worker.onmessage = (event) => {
      resolve(event.data);
    };
    worker.postMessage({ communities, players });
  });

export default {
  getActivePlayers,
  getCombinations,
  getCommunityCombinations,
  splitArrayToChunks,
  updateFrequencyCounter,
  runWorker,
};
