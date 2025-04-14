type Card = {
  suit: string;
  value: string;
  index: number;
  isSelected: boolean;
  isInTable?: boolean;
};

type Hand = Card[];

type Players = Record<string, Hand>;
type PlayerValuation = Record<string, HandEvaluation>;

type HandEvaluation = {
  name: string;
  value: number;
  kickers: number;
};

type FrequencyCounter = Record<string, number>;
type Results = Record<string, FrequencyCounter>;

type Ranking = Record<string, string>;
type PresentableResults = {
  winners: string[];
  ties: string[];
  ranking: Ranking;
};

type ValidCards = boolean[];
type ValidationTable = Record<string, ValidCards>;

export type { Card };
export type { FrequencyCounter };
export type { Hand };
export type { HandEvaluation };
export type { Players };
export type { PlayerValuation };
export type { PresentableResults };
export type { Ranking };
export type { Results };
export type { ValidationTable };
export type { ValidCards };
