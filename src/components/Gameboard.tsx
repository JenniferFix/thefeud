import React from "react";
import AnswerPanel from "./AnswerPanel";
import { useRecoilState, useRecoilCallback } from "recoil";
import { Answer } from "../types";
import { answerState, answersState } from "./states";

const data: Answer[] = [
  {
    id: "Ft5fTjxkRzDAn8jF-0ADU",
    answer: "answer1",
    score: 10,
    flipped: false,
    rank: 1,
  },
  // {
  //   id: "umVHBRVoedbc-2jCu3QFM",
  //   answer: "answer2",
  //   score: 10,
  //   flipped: false,
  //   rank: 2,
  // },
  // {
  //   id: "b19_SHXC8HIr9JNqquoP8",
  //   answer: "answer3",
  //   score: 10,
  //   flipped: false,
  //   rank: 3,
  // },
  // {
  //   id: "j5Z8cSjeW6QVXcjsY4Cjr",
  //   answer: "answer4",
  //   score: 10,
  //   flipped: false,
  //   rank: 4,
  // },
  // {
  //   id: "OvXSLwSByuDIFNuO3Xe8z",
  //   answer: "answer5",
  //   score: 10,
  //   flipped: false,
  //   rank: 5,
  // },
  // {
  //   id: "FQLglqPRPItpWGCY17xEL",
  //   answer: "answer6",
  //   score: 10,
  //   flipped: false,
  //   rank: 6,
  // },
  // {
  //   id: "hKS3-ZeVzFBTuiDUIkEiQ",
  //   answer: "answer7",
  //   score: 10,
  //   flipped: false,
  //   rank: 7,
  // },
  // {
  //   id: "85UslINGpdH3lewU9-QjE",
  //   answer: "answer8",
  //   score: 10,
  //   flipped: false,
  //   rank: 8,
  // },
];

const Gameboard = (): React.ReactElement => {
  const [answersList, setAnswersList] = useRecoilState(answersState);

  const createAnswer = useRecoilCallback(
    ({ set }) =>
      (answer: Answer) => {
        console.log("create");
        // set(answerState(answer.id), { ...answer });
        set(answersState, (oldList) => [...oldList, answer.id]);
      },
    []
  );

  data.forEach((d) => {
    createAnswer(d);
  });

  return (
    <div className="grid grid-cols-2 grid-rows-4 grid-flow-col">
      {answersList.map((d) => (
        <div key={d}>
          <AnswerPanel id={d} />
        </div>
      ))}
    </div>
  );
};

export default Gameboard;
