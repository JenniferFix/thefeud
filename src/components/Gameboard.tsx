import React from "react";
import AnswerPanel from "./AnswerPanel";
import {
  atom,
  atomFamily,
  selector,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
  useRecoilCallback,
} from "recoil";
import { nanoid } from 'nanoid';



export type Answer = {
  id: string;
  answer: string;
  score: number;
  flipped: boolean;
  rank: number;
};

const data: Answer[] = [
  {
    id: "Ft5fTjxkRzDAn8jF-0ADU",
    answer: "answer1",
    score: 10,
    flipped: false,
    rank: 1,
  },
  {
    id: "umVHBRVoedbc-2jCu3QFM",
    answer: "answer1",
    score: 10,
    flipped: false,
    rank: 2,
  },
  {
    id: "b19_SHXC8HIr9JNqquoP8",
    answer: "answer1",
    score: 10,
    flipped: false,
    rank: 3,
  },
  {
    id: "j5Z8cSjeW6QVXcjsY4Cjr",
    answer: "answer1",
    score: 10,
    flipped: false,
    rank: 4,
  },
  {
    id: "OvXSLwSByuDIFNuO3Xe8z",
    answer: "answer1",
    score: 10,
    flipped: false,
    rank: 5,
  },
  {
    id: "FQLglqPRPItpWGCY17xEL",
    answer: "answer1",
    score: 10,
    flipped: false,
    rank: 6,
  },
  {
    id: "hKS3-ZeVzFBTuiDUIkEiQ",
    answer: "answer1",
    score: 10,
    flipped: false,
    rank: 7,
  },
  {
    id: "85UslINGpdH3lewU9-QjE",
    answer: "answer1",
    score: 10,
    flipped: false,
    rank: 8,
  },
];

const defaultAnswer: Answer = {
  id: "",
  answer: "",
  score: 0,
  flipped: false,
  rank: 0,
};

const answersState = atom<string[]>({
  key: "answers",
  default: [],
});

const answerState = atomFamily<Answer, string>({
  key: "answer",
  default: defaultAnswer,
});

const useUpdateAnswer = (id: string, value: Answer) => {
  const [answers, setAnswers] = useRecoilState(answersState);

  return useRecoilCallback(({set}) => {
      set(answerState(id, data.filter(d => d.id === id)[0]));
  }, [answers])
}



const handlePanelClick = (idx: number) => {
  data[idx].flipped = !data[idx].flipped;
  console.log("clicked", idx, data[idx].flipped);
};

const Gameboard = (): React.FC => {
  const [answersList, setAnswersList] = useRecoilState(answersState);

  data.forEach((d) => {
    setAnswersList((oldList) => [...oldList, d.id]);

  });

  return (
    <div className="grid grid-cols-2 grid-rows-4 grid-flow-col">
      {answersList
        .sort((a, b) => a.rank - b.rank)
        .map((d, idx) => (
          <div key={d.answer + (idx + 1)} onClick={() => handlePanelClick(idx)}>
            <AnswerPanel
              idx={d.rank}
              answer={d.answer}
              score={d.score}
              flipped={d.flipped}
            />
          </div>
        ))}
    </div>
  );
};

export default Gameboard;
