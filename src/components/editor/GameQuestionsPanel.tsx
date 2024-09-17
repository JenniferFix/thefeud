import React from 'react';
import { ToggleGroup } from '../ui/toggle-group';
import { useGetGameQuestions } from '@/hooks/usegamequeries';
import { type TGameQuestions } from '@/queries/gamequeries';
import { useEditorStore } from '@/store';

const Questions = ({ itemId }: { itemId: string }) => {
  const { isError, data, error, isLoading } = useGetGameQuestions(itemId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>No Data</div>;
  const typedData: TGameQuestions = data;

  return typedData[0].questions.map((q) => (
    <Question key={q.id} id={q.id} text={q.question ?? ''} />
  ));
};

const QuestionsPanel = () => {
  const selectedGameQuestion = useEditorStore(
    (state) => state.editorSelectedGame,
  );
  const updateSelectedGameQuestion = useEditorStore(
    (state) => state.updateEditorSelectedGameQuestion,
  );
  return (
    <div className="flex flex-col justify-apart h-full w-full p-1">
      {selectedGameQuestion !== '' ? (
        <ToggleGroup
          type="single"
          className="h-full items-start justify-start w-full"
          onValueChange={(value) => updateSelectedGameQuestion(value)}
        >
          <Questions itemId={selectedGameQuestion} />
        </ToggleGroup>
      ) : (
        <div>Nothing Selected</div>
      )}
    </div>
  );
};

export default QuestionsPanel;
