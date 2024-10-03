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
  CorrectAnswer, // question field, team field
  Strike, // Team
  TeamWin,
}
