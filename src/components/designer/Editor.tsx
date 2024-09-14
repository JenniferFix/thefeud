'use client';
import React from 'react';
import Games from './Games';
import GameQuestions from '@/components/designer/GameQuestions';
import { useEditorStore } from '@/store';
import { Button } from '@/components/ui/button';

import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import Questions from './Questions';
import { ThickArrowLeftIcon, ThickArrowRightIcon } from '@radix-ui/react-icons';

const MovePanel = () => {
  const selectedGameQuestion = useEditorStore(
    (state) => state.editorSelectedGameQuestion,
  );
  const selectedFromAllGameQuestion = useEditorStore(
    (state) => state.editorSelectedFromAllQuestions,
  );
  return (
    <div className="flex flex-col h-full justify-center mx-6 gap-4">
      <Button
        size="icon"
        variant="outline"
        disabled={selectedFromAllGameQuestion === '' ? true : false}
      >
        <ThickArrowLeftIcon />
      </Button>
      <Button
        size="icon"
        variant="outline"
        disabled={selectedGameQuestion === '' ? true : false}
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
          {selectedItem ? (
            <GameQuestions gameId={selectedItem} />
          ) : (
            <div>Nothing Selected</div>
          )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <MovePanel />
        <ResizablePanel defaultSize={34}>
          <Questions />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;
