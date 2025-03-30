const HAND_STRENGTH: Record<string, number> = {
  "Flush Royal": 10000,
  "Straight Flush": 9000,
  Quads: 8000,
  "Full House": 7000,
  Flush: 6000,
  Straight: 5000,
  "Three of a Kind": 4000,
  "Two Pairs": 3000,
  "One Pair": 2000,
  "High Card": 1000,
};

const CARD_STRENGTH: Record<string, number> = {
  "6": 1,
  "7": 2,
  "8": 3,
  "9": 4,
  "10": 5,
  J: 6,
  Q: 7,
  K: 8,
  A: 9,
};

export default { HAND_STRENGTH, CARD_STRENGTH };
