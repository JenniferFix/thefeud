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
import QuestionsPanel from './QuestionsPanel';
import GameQuestionsPanel from './GameQuestionsPanel';
import { ThickArrowLeftIcon, ThickArrowRightIcon } from '@radix-ui/react-icons';

const MovePanel = () => {
  const selectedGameQuestion = useEditorStore(
    (state) => state.editorSelectedGameQuestion,
  );
  const selectedGame = useEditorStore((state) => state.editorSelectedGame);
  const selectedFromAllGameQuestion = useEditorStore(
    (state) => state.editorSelectedFromAllQuestions,
  );
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
      >
        <ThickArrowLeftIcon />
      </Button>
      <Button
        size="icon"
        variant="outline"
        disabled={
          selectedGame === '' || selectedGameQuestion === '' ? true : false
        }
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
          <QuestionsPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;
