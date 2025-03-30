type Card = {
  suit: string;
  value: string;
  index: number;
  isSelected: boolean;
  isInTable?: boolean;
};

type Hand = Card[];

type Players = Record<string, Hand>;

type HandEvaluation = {
  name: string;
  value: number;
  kickers: number;
};

type PlayerValuation = Record<string, HandEvaluation>;

type FrequencyCounter = Record<string, number>;

type Results = Record<string, FrequencyCounter>;

type PresentableResults = {
  winners: string[];
  ties: string[];
  ranking: Ranking;
};

type Ranking = Record<string, string>;

type ValidCards = boolean[];

type ValidationTable = Record<string, ValidCards>;

export {
  Card,
  FrequencyCounter,
  Hand,
  HandEvaluation,
  Players,
  PlayerValuation,
  PresentableResults,
  Ranking,
  Results,
  ValidationTable,
  ValidCards,
};
