'use client';
import React from 'react';
import Games from './Games';
import { useEditorStore } from '@/store';
import { Button } from '@/components/ui/button';

import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import AllQuestionsPanel from './AllQuestionsPanel';
import GameQuestionsPanel from './GameQuestionsPanel';
import { ThickArrowLeftIcon, ThickArrowRightIcon } from '@radix-ui/react-icons';
import {
  useAddQuestionToGame,
  useRemoveQuestionFromGame,
} from '@/hooks/usegamequeries';

const MovePanel = () => {
  const selectedGameQuestion = useEditorStore(
    (state) => state.editorSelectedGameQuestion,
  );
  const selectedGame = useEditorStore((state) => state.editorSelectedGame);
  const selectedFromAllGameQuestion = useEditorStore(
    (state) => state.editorSelectedFromAllQuestions,
  );
  const updateSelectedGameQuestion = useEditorStore(
    (state) => state.updateEditorSelectedGameQuestion,
  );
  const updateFromAllGameQuestion = useEditorStore(
    (state) => state.updateEditorSelectedFromAllQuestions,
  );
  const addToGame = useAddQuestionToGame();
  const removeFromGame = useRemoveQuestionFromGame();

  const handleAddToGame = () => {
    if (selectedGame === '' || selectedFromAllGameQuestion === '') return;
    addToGame.mutate({
      gameId: selectedGame,
      questionId: selectedFromAllGameQuestion,
    });
    updateSelectedGameQuestion(selectedFromAllGameQuestion);
    updateFromAllGameQuestion('');
  };

  const handleRemoveFromGame = () => {
    if (selectedGame === '' || selectedGameQuestion === '') return;
    removeFromGame.mutate({
      gameId: selectedGame,
      questionId: selectedGameQuestion,
    });
    updateFromAllGameQuestion(selectedGameQuestion);
    updateSelectedGameQuestion('');
  };

  return (
    <div className="flex flex-col h-full justify-center px-4 gap-4 border-r">
      <Button
        size="icon"
        variant="outline"
        disabled={
          selectedGame === '' || selectedFromAllGameQuestion === ''
            ? true
            : false
        }
        onClick={handleAddToGame}
      >
        <ThickArrowLeftIcon />
      </Button>
      <Button
        size="icon"
        variant="outline"
        disabled={
          selectedGame === '' || selectedGameQuestion === '' ? true : false
        }
        onClick={handleRemoveFromGame}
      >
        <ThickArrowRightIcon />
      </Button>
    </div>
  );
};

const Editor = () => {
  const selectedItem = useEditorStore((state) => state.editorSelectedGame);
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30}>
          <Games />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30}>
          <GameQuestionsPanel />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <MovePanel />
        <ResizablePanel defaultSize={40}>
          <AllQuestionsPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;
