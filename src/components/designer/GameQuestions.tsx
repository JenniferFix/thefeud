'use client';
import React from 'react';
import { useGetGameQuestions } from '@/hooks/usegamequeries';
import { type TGameQuestions } from '@/queries/gamequeries';
import Question from './Question';

const Questions = ({ gameId }: { gameId: string }) => {
  const { isError, data, error, isLoading } = useGetGameQuestions(gameId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>Nodata</div>;

  const typedData: TGameQuestions = data;

  const qs = typedData[0];
  return qs?.questions.map((q) => (
    <Question key={q.id} id={q.id} text={q.question ?? ''} />
  ));
  // return <div>Testing</div>;
};

export default Questions;
