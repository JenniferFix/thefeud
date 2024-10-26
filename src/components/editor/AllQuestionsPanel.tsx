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
  /* <div className="flex flex-col justify-apart h-full w-full p-1"> */
  return (
    <div className="h-full p-2">
      <Questions />
      <Question addQuestion />
    </div>
  );
  // </div>
};

export default QuestionsPanel;
