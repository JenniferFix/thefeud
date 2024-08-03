import { atom, atomFamily } from "recoil";
import { Answer } from "../types";

const defaultAnswer: Answer = {
  id: "",
  answer: "",
  score: 0,
  flipped: false,
  rank: 0,
};

export const answersState = atom<string[]>({
  key: "answers",
  default: [],
});

export const answerState = atomFamily<Answer, string>({
  key: "answer",
  default: defaultAnswer,
});
