import React from 'react';
import Games from './Games';
import Questions from './Questions';
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const Editor = () => {
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <Games />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>One</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;
