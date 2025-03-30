import { Card, Hand, Players, ValidationTable } from "../types";
import C from "./constants";

const getDeck = (): Card[] => {
  const deck: Card[] = [];
  C.VALUES.forEach((value, valueIndex) => {
    C.SUITS.forEach((suit, suitIndex) => {
      const index = valueIndex * C.SUITS.length + suitIndex;
      const isSelected = false;
      deck.push({ suit, value, index, isSelected });
    });
  });
  return deck;
};

const updateDeck = (
  deck: Card[],
  payload: { cardIndex: number; isSelected: boolean }
) => {
  const { cardIndex, isSelected } = payload;
  deck.filter((card) => {
    if (card.index === cardIndex) {
      card.isSelected = isSelected;
    }
    return card;
  });
  return deck;
};

const removeCard = (state: Players, cardIndex: number) => {
  Object.keys(state).map((slot) => {
    state[slot].map((value, index) => {
      if (value.index === cardIndex) {
        state[slot][index] = C.EMPTY_CARD;
      }
    });
  });
  return state;
};

const validateHero = (hero: Hand): boolean[] => [
  hero[0].index !== -1,
  hero[1].index !== -1,
];

const validateCommunity = (community: Card[]) => {
  if (community[4].index !== -1) {
    return [
      community[0].index !== -1,
      community[1].index !== -1,
      community[2].index !== -1,
      community[3].index !== -1,
      true,
    ];
  }

  const isFlopCardSelected =
    community[0].index !== -1 ||
    community[1].index !== -1 ||
    community[2].index !== -1;

  if (community[3].index !== -1 || isFlopCardSelected) {
    return [
      community[0].index !== -1,
      community[1].index !== -1,
      community[2].index !== -1,
      true,
      true,
    ];
  }

  return Array(5).fill(true);
};

const validatePlayer = (player: Hand) => {
  const isPlayerCardSelected = player[0].index !== -1 || player[1].index !== -1;
  if (isPlayerCardSelected) {
    return [player[0].index !== -1, player[1].index !== -1];
  }
  return Array(2).fill(true);
};

const runValidation = (state: ValidationTable, table: Players) => {
  Object.keys(table).map((key) => {
    if (key === "hero") {
      state[key] = validateHero(table[key]);
    } else if (key === "community") {
      state[key] = validateCommunity(table[key]);
    } else {
      state[key] = validatePlayer(table[key]);
    }
  });
  return state;
};

export default {
  getDeck,
  removeCard,
  validateCommunity,
  validatePlayer,
  runValidation,
  updateDeck,
};
