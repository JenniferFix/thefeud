import { MergeDeep } from 'type-fest';
export type Answer = {
  id: string;
  answer: string;
  score: number;
  flipped: boolean;
  rank: number;
};

export interface IAnswers {
  [key: string]: Answer;
}

export enum GameActions {
  StartQuestion = 1, // game id
  CorrectQuestion, // question field, team field
  IncorrectGuess, // Team
}
