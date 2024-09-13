'use client';
import React from 'react';
import Games from './Games';
import GameQuestions from '@/components/designer/GameQuestions';
import { useFeudStore } from '@/store';

import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const Editor = () => {
  const selectedItem = useFeudStore((state) => state.selectedGame);
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <Games />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          {selectedItem ? (
            <GameQuestions gameId={selectedItem} />
          ) : (
            <div>Nothing Selected</div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;
