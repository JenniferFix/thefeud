import React from 'react';
import Question from './Question';
import { useSuspenseQuery } from '@tanstack/react-query';
import { gameQuestionsQueryOptions } from '@/hooks/usegamequeries';
import { useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import AddQuestionToGameDialog from './AddQuestionToGameDialog';

const HeaderSection = ({ gameId }: { gameId: string }) => {
  return (
    <div className="w-full">
      <AddQuestionToGameDialog gameid={gameId} />
    </div>
  );
};
const QuestionsPanel = () => {
  const params = useParams({ from: '/_navbar-layout/_auth/e/games/$gameId' });
  const gameQuestionsQuery = useSuspenseQuery(
    gameQuestionsQueryOptions(params.gameId),
  );
  const gameQuestions = gameQuestionsQuery.data;
  if (!gameQuestions) return <div>nothing here</div>;
  return (
    <section className="w-full px-3 pt-3">
      <HeaderSection gameId={params.gameId} />
      <div className="my-1">
        {gameQuestions.questions.map((q) => (
          <Question key={q.id} id={q.id} text={q.question ?? ''} />
        ))}
      </div>
    </section>
  );
};

export default QuestionsPanel;
