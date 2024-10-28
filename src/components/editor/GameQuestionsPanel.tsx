import React from 'react';
import Question from './Question';
import { useSuspenseQuery } from '@tanstack/react-query';
import { gameQuestionsQueryOptions } from '@/hooks/usegamequeries';
import { useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import AddQuestionToGameDialog from './AddQuestionToGameDialog';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { ScrollArea } from '@/components/ui/scroll-area';

const HeaderSection = ({ gameId }: { gameId: string }) => {
  const {
    history: { back },
  } = useRouter();
  return (
    <div className="w-full flex items-center justify-between">
      <AddQuestionToGameDialog gameid={gameId} />
      <Button variant="outline" size="icon" onClick={() => back()}>
        <ArrowLeftIcon />
      </Button>
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
    <section className="flex flex-col h-full w-full gap-2 px-3 pt-3">
      <HeaderSection gameId={params.gameId} />
      <ScrollArea className="min-h-0 grow">
        {gameQuestions.questions.map((q) => (
          <Question key={q.id} id={q.id} text={q.question ?? ''} />
        ))}
      </ScrollArea>
    </section>
  );
};

export default QuestionsPanel;
