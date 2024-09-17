import React from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { useGetUsersQuestions } from '@/hooks/usequestionqueries';
import { useEditorStore } from '@/store';
import Question from './Question';

const Questions = () => {
  const { isError, data, error, isLoading } = useGetUsersQuestions();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return data?.map((q) => (
    <Question key={q.id} id={q.id} text={q.question ?? ''} />
  ));
};

const QuestionsPanel = () => {
  const updateSelectedGame = useEditorStore(
    (state) => state.updateEditorSelectedFromAllQuestions,
  );
  const selectedGame = useEditorStore(
    (state) => state.editorSelectedFromAllQuestions,
  );
  return (
    <div className="flex flex-col justify-apart h-full w-full p-1">
      <ToggleGroup
        type="single"
        className="h-full items-start justify-start w-full flex flex-col"
        value={selectedGame}
        onValueChange={(value) => updateSelectedGame(value)}
      >
        <Questions />
      </ToggleGroup>
      <Button size="lg" variant="default" className="w-full">
        Add
      </Button>
    </div>
  );
};

export default QuestionsPanel;
