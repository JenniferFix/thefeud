import { atom, atomFamily, selectorFamily } from 'recoil';
import { Answer, IAnswers } from '../types';

const data: IAnswers = {
  'Ft5fTjxkRzDAn8jF-0ADU': {
    id: 'Ft5fTjxkRzDAn8jF-0ADU',
    answer: 'answer1',
    score: 10,
    flipped: false,
    rank: 1,
  },
  'umVHBRVoedbc-2jCu3QFM': {
    id: 'umVHBRVoedbc-2jCu3QFM',
    answer: 'answer2',
    score: 10,
    flipped: false,
    rank: 2,
  },
  b19_SHXC8HIr9JNqquoP8: {
    id: 'b19_SHXC8HIr9JNqquoP8',
    answer: 'answer3',
    score: 10,
    flipped: false,
    rank: 3,
  },
  j5Z8cSjeW6QVXcjsY4Cjr: {
    id: 'j5Z8cSjeW6QVXcjsY4Cjr',
    answer: 'answer4',
    score: 10,
    flipped: false,
    rank: 4,
  },
  OvXSLwSByuDIFNuO3Xe8z: {
    id: 'OvXSLwSByuDIFNuO3Xe8z',
    answer: 'answer5',
    score: 10,
    flipped: false,
    rank: 5,
  },
  FQLglqPRPItpWGCY17xEL: {
    id: 'FQLglqPRPItpWGCY17xEL',
    answer: 'answer6',
    score: 10,
    flipped: false,
    rank: 6,
  },
  'hKS3-ZeVzFBTuiDUIkEiQ': {
    id: 'hKS3-ZeVzFBTuiDUIkEiQ',
    answer: 'answer7',
    score: 10,
    flipped: false,
    rank: 7,
  },
  '85UslINGpdH3lewU9-QjE': {
    id: '85UslINGpdH3lewU9-QjE',
    answer: 'answer8',
    score: 10,
    flipped: false,
    rank: 8,
  },
};

const ans = [];
for (const [key] of Object.entries(data)) {
  ans.push(key);
}
const defaultAnswer: Answer = {
  id: '',
  answer: '',
  score: 0,
  flipped: false,
  rank: 0,
};

export const answerState = atom({
  key: 'answers',
  default: data,
});

export const answerAtom = atomFamily<Answer, string>({
  key: 'answer',
  default: defaultAnswer,
});

export const answersState = atom({
  key: 'answersState',
  default: ans,
});

export const answerSelector = selectorFamily<Answer, string>({
  key: 'answerSelector',
  get:
    (id) =>
    ({ get }) => {
      const a = get(answerState)[id];
      if (!a) throw new Error('Answer not found');
      return a;
    },
  set:
    (id: string) =>
    ({ set, get }, newValue) => {
      const currentState = get(answerState);
      set(answerState, { ...currentState, [id]: { ...newValue } } as IAnswers);
    },
});
