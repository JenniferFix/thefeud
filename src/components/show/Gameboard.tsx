'use client';
import React from 'react';
import AnswerPanel from './AnswerPanel';
import { Tables } from '@/types/supabase.types';

const Gameboard = ({
  answers,
}: {
  answers?: Tables<'answers'>[];
}): React.ReactElement => {
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

  console.log(answers);
  if (!answers) {
    // answers = [{ id: '1', answer: 'Answer1', score: 0 }];
  }
  return (
    <div className="grid grid-cols-2 grid-rows-4 grid-flow-col h-full">
      <AnswerPanel />
    </div>
  );
};

export default Gameboard;
