import { evaluateHandStrength } from "./hand";
import U from "./utils";
import { Hand, HandEvaluation, Players, PlayerValuation } from "../../types";

const isHandStronger = (
  currentHand: HandEvaluation,
  bestHand: HandEvaluation | null
): boolean => {
  return (
    !bestHand ||
    currentHand.value > bestHand.value ||
    (currentHand.value === bestHand.value &&
      currentHand.kickers > bestHand.kickers)
  );
};

const evaluatePlayer = (community: Hand, player: Hand): HandEvaluation => {
  const possibleHands = U.getCombinations([...community, ...player], 5);
  let bestHand: HandEvaluation | null = null;
  for (const hand of possibleHands) {
    const currentHand = evaluateHandStrength(hand);
    if (isHandStronger(currentHand, bestHand)) {
      bestHand = currentHand;
    }
  }
  return bestHand!;
};

const evaluateTable = (community: Hand, players: Players): PlayerValuation => {
  const tableEvaluation: PlayerValuation = {};
  Object.keys(players).forEach((key) => {
    tableEvaluation[key] = evaluatePlayer(community, players[key]);
  });
  return tableEvaluation;
};

const getWinners = (players: PlayerValuation): string[] => {
  let bestHand: HandEvaluation | null = null;
  for (const key in players) {
    if (isHandStronger(players[key], bestHand)) {
      bestHand = players[key];
    }
  }
  const winners: string[] = [];
  for (const key in players) {
    if (
      players[key].value === bestHand!.value &&
      players[key].kickers === bestHand!.kickers
    ) {
      winners.push(key);
    }
  }
  return winners;
};

export { getWinners, evaluateTable };
