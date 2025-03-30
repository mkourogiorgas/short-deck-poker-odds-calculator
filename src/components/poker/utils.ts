import { Hand, FrequencyCounter, Players, Results } from "../../types";

const getCombinations = (
  cards: Hand,
  combinationLength: number,
  combinations: Hand[] = [],
  inProgressCombination: Hand = [],
  index: number = 0
) => {
  if (!combinationLength) {
    return [];
  }
  const isCombinationLengthReached = combinationLength == 1;
  for (let loopIndex = index; loopIndex < cards.length; loopIndex++) {
    const combination = [...inProgressCombination, cards[loopIndex]];

    if (isCombinationLengthReached) {
      combinations.push(combination);
    } else {
      getCombinations(
        cards,
        combinationLength - 1,
        combinations,
        combination,
        loopIndex + 1
      );
    }
  }
  return combinations;
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

const filterActivePlayers = (table: Players): Players => {
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
    const myWorker = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });
    myWorker.onmessage = (event) => {
      resolve(event.data);
    };
    myWorker.postMessage({ communities, players });
  });

const numberOfActiveVillains = (table: Players): number =>
  Object.values(table).reduce((accumulator, player) => {
    return player.length === 2 && player[0].index !== -1
      ? accumulator + 1
      : accumulator;
  }, 0);

export default {
  filterActivePlayers,
  getCombinations,
  getCommunityCombinations,
  numberOfActiveVillains,
  splitArrayToChunks,
  updateFrequencyCounter,
  runWorker,
};
