'use client';
import React from 'react';
import AnswerPanel from './AnswerPanel';
import { useRecoilValue } from 'recoil';
import { answersState } from './states';
import GameBg from './GameBg';

const Gameboard = (): React.ReactElement => {
  const answersList = useRecoilValue<string[]>(answersState);
  // console.log(answersList);
  // const createAnswer = useRecoilCallback(
  //   ({ set }) =>
  //     (answer: Answer) => {
  //       console.log("create");
  //       console.log(answer);
  //       set(answerState(answer.id), { ...answer });
  //       // set(answersState, (oldList) => [...oldList, answer.id]);
  //     },
  //   [data],
  // );

  // data.forEach((d) => {
  //   createAnswer(d);
  // });

  return (
    <div className="grid grid-cols-2 grid-rows-4 grid-flow-col h-full">
      {(answersList &&
        answersList.map((d) => (
          <div key={d}>
            <AnswerPanel id={d} />
          </div>
        ))) || <div>Something</div>}
    </div>
  );
};

export default Gameboard;
