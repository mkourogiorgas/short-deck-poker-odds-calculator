type StringObject = Record<string, string>;

const EQUITY_TABLE: string[] = [
  "Hero",
  "",
  "Villains",
  "0%",
  "Win",
  "0%",
  "0%",
  "Tie",
  "0%",
  "",
];

const RANKING_TABLE: StringObject = {
  Rank: "Hero",
  "Flush Royal": "0%",
  "Straight Flush": "0%",
  Quads: "0%",
  "Full House": "0%",
  Flush: "0%",
  Straight: "0%",
  "Three of a Kind": "0%",
  "Two Pairs": "0%",
  "One Pair": "0%",
  "High Card": "0%",
};

const TEXT_COLOR: StringObject = {
  HERO: "text-[#007c7b]",
  BLACK: "text-[#393939]",
  VILLAINS: "text-[#731C16]",
};

const FONT_SIZE: StringObject = {
  XLARGE: "text-xl",
  SMALL: "text-xs",
};

const EQUITY_TABLE_FONT_SIZE = [
  FONT_SIZE.XLARGE,
  FONT_SIZE.XLARGE,
  FONT_SIZE.XLARGE,
];

const EQUITY_TABLE_FONT_COLOR = [
  TEXT_COLOR.HERO,
  TEXT_COLOR.BLACK,
  TEXT_COLOR.VILLAINS,
];

export default {
  EQUITY_TABLE,
  EQUITY_TABLE_FONT_SIZE,
  EQUITY_TABLE_FONT_COLOR,
  RANKING_TABLE,
  FONT_SIZE,
  TEXT_COLOR,
};
