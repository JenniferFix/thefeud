import React from 'react';
import { ToggleGroup } from '../ui/toggle-group';
import { useGetGameQuestions } from '@/hooks/usegamequeries';
import { type TGameQuestions } from '@/queries/gamequeries';
import { useEditorStore } from '@/store';
import Question from './Question';

const Questions = ({ gameId }: { gameId: string }) => {
  const { isError, data, error, isLoading } = useGetGameQuestions(gameId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>No Data</div>;
  const typedData: TGameQuestions = data;

  return typedData.questions.map((q) => (
    <Question key={q.id} id={q.id} text={q.question ?? ''} />
  ));
};

const QuestionsPanel = () => {
  const selectedGame = useEditorStore((state) => state.editorSelectedGame);
  const selectedGameQuestion = useEditorStore(
    (state) => state.editorSelectedGameQuestion,
  );
  const updateSelectedGameQuestion = useEditorStore(
    (state) => state.updateEditorSelectedGameQuestion,
  );
  return (
    <div className="flex flex-col justify-apart h-full w-full p-1">
      {selectedGame !== '' ? (
        <ToggleGroup
          type="single"
          className="h-full items-start justify-start w-full flex flex-col"
          value={selectedGameQuestion}
          onValueChange={(value) => updateSelectedGameQuestion(value)}
        >
          <Questions gameId={selectedGame} />
        </ToggleGroup>
      ) : (
        <div>Nothing Selected</div>
      )}
    </div>
  );
};

export default QuestionsPanel;
