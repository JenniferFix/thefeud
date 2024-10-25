import React from 'react';
import Question from './Question';
import { useSuspenseQuery } from '@tanstack/react-query';
import { gameQuestionsQueryOptions } from '@/hooks/usegamequeries';
import { useParams } from '@tanstack/react-router';

const QuestionsPanel = () => {
  const params = useParams({ from: '/_navbar-layout/_auth/e/$gameId' });
  const gameQuestionsQuery = useSuspenseQuery(
    gameQuestionsQueryOptions(params.gameId),
  );
  const gameQuestions = gameQuestionsQuery.data;
  if (!gameQuestions) return <div>nothing here</div>;
  return gameQuestions.questions.map((q) => (
    <Question key={q.id} id={q.id} text={q.question ?? ''} />
  ));
};

export default QuestionsPanel;
