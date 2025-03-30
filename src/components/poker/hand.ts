import C from "./constants";
import K from "./kickers";
import { Hand, FrequencyCounter } from "../../types";

const prepareHand = (hand: Hand) => {
  const cardsFrequency: FrequencyCounter = {};
  const suitsFrequency: FrequencyCounter = {};
  const cardsStrength: number[] = [];
  for (let i = 0; i < hand.length; i++) {
    const { suit, value } = hand[i];
    cardsFrequency[value] = (cardsFrequency[value] || 0) + 1;
    suitsFrequency[suit] = (suitsFrequency[suit] || 0) + 1;
    cardsStrength.push(C.CARD_STRENGTH[value]);
  }

  const uniqueCardsCount = Object.keys(cardsFrequency).length;
  const areCardsDifferent = uniqueCardsCount === 5;
  const isFlush = Object.keys(suitsFrequency).length === 1;
  const hasAce = Boolean(cardsFrequency["A"]);

  let areCardsConsecutive = false;
  if (areCardsDifferent) {
    cardsStrength.sort((a, b) => a - b);
    areCardsConsecutive = cardsStrength[4] - cardsStrength[0] === 4;
  }
  return {
    cardsFrequency,
    isFlush,
    hasAce,
    areCardsDifferent,
    areCardsConsecutive,
    cardsStrength,
  };
};

const evaluateHandStrength = (hand: Hand) => {
  let name = "";
  let kickers = 0;
  const {
    cardsFrequency,
    isFlush,
    hasAce,
    areCardsDifferent,
    areCardsConsecutive,
    cardsStrength,
  } = prepareHand(hand);

  const frequencies = Object.values(cardsFrequency);

  if (areCardsDifferent) {
    if (isFlush && areCardsConsecutive && hasAce) {
      name = "Flush Royal";
    } else if (isFlush && areCardsConsecutive) {
      name = "Straight Flush";
      kickers = cardsStrength[0];
    } else if (isFlush) {
      name = "Flush";
      kickers = K.flush(cardsFrequency);
    } else if (areCardsConsecutive) {
      name = "Straight";
      kickers = cardsStrength[0];
    } else {
      name = "High Card";
      kickers = K.highCard(cardsFrequency);
    }
  } else {
    const isQuads = frequencies.includes(4);
    const isFullHouse = frequencies.includes(3) && frequencies.includes(2);
    const isThreeOfAKind = frequencies.includes(3) && !isFullHouse;
    const isTwoPair = frequencies.filter((count) => count === 2).length === 2;

    if (isQuads) {
      name = "Quads";
      kickers = K.quads(cardsFrequency);
    } else if (isFullHouse) {
      name = "Full House";
      kickers = K.fullHouse(cardsFrequency);
    } else if (isThreeOfAKind) {
      name = "Three of a Kind";
      kickers = K.threeOfAKind(cardsFrequency);
    } else if (isTwoPair) {
      name = "Two Pairs";
      kickers = K.twoPairs(cardsFrequency);
    } else {
      name = "One Pair";
      kickers = K.onePair(cardsFrequency);
    }
  }

  const value = C.HAND_STRENGTH[name];
  return { name, value, kickers };
};

export { evaluateHandStrength };
