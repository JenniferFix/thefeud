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
  const addToGame = useAddQuestionToGame();
  const removeFromGame = useRemoveQuestionFromGame();

  const handleAddToGame = () => {
    if (selectedGame === '' || selectedFromAllGameQuestion === '') return;
    console.log('adding');
    addToGame.mutate({
      gameId: selectedGame,
      questionId: selectedFromAllGameQuestion,
    });
  };

  const handleRemoveFromGame = () => {
    if (selectedGame === '' || selectedGameQuestion === '') return;
    console.log('removing');
    console.log('selectedGame:', selectedGame);
    console.log('selectedFromAllGameQuestion: ', selectedGameQuestion);
    removeFromGame.mutate({
      gameId: selectedGame,
      questionId: selectedGameQuestion,
    });
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
        <ResizablePanel defaultSize={33}>
          <Games />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={33}>
          <GameQuestionsPanel />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <MovePanel />
        <ResizablePanel defaultSize={33}>
          <AllQuestionsPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;
