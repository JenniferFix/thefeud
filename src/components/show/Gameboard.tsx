'use client';
import React from 'react';
import AnswerPanel from './AnswerPanel';
import { Tables } from '@/types/supabase.types';
import { IAnswered } from '@/types';

const Gameboard = ({
  answers,
  answered,
}: {
  answers: Tables<'answers'>[];
  answered: IAnswered;
}): React.ReactElement => {
  if (!answers) {
    // answers = [{ id: '1', answer: 'Answer1', score: 0 }];
  }

  return (
    <div className="grid grid-cols-2 grid-rows-4 grid-flow-col h-full">
      {answers.map((i, index) => (
        <AnswerPanel
          key={'answerpanel' + i.id}
          id={i.id}
          answer={i.answer}
          flipped={answered[i.id]}
          points={i.score}
          order={index + 1}
        />
      ))}
      {Array.from({ length: 8 - answers.length }, (_e, i) => (
        <AnswerPanel
          key={'ap' + i}
          id={'ap' + i}
          answer={''}
          flipped={false}
          points={0}
        />
      ))}
    </div>
  );
};

export default Gameboard;
