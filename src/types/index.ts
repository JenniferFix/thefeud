export type Answer = {
  id: string;
  answer: string;
  score: number;
  flipped: boolean;
  rank: number;
};

export interface IAnswered {
  [key: string]: boolean;
}

export interface IAnswers {
  [key: string]: Answer;
}

export enum GameActions {
  StartQuestion = 1, // game id, question id
  CorrectAnswer, // question field, team field
  Strike, // Team
  TeamWin,
}
