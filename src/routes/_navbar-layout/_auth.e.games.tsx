import * as React from 'react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { gamesQueryOptions } from '@/hooks/usegamequeries';
import Games from '@/components/editor/Games';
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { gameQuestionsQueryOptions } from '@/hooks/usegamequeries';

export const Route = createFileRoute('/_navbar-layout/_auth/e/games')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(gamesQueryOptions),
  component: () => <EditorLayout />,
});

const EditorLayout = () => {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={25}>
        <Games />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
