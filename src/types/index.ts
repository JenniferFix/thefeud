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
