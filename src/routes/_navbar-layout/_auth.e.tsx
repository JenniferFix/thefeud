import * as React from 'react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import Editor from '@/components/editor/Editor';
import { useSupabaseAuth } from '@/supabaseauth';
import { gamesQueryOptions } from '@/hooks/usegamequeries';
import Games from '@/components/editor/Games';
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export const Route = createFileRoute('/_navbar-layout/_auth/e')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(gamesQueryOptions),
  component: () => <EditorLayout />,
});

const EditorLayout = () => {
  // const gamesQuery = useSuspenseQuery(gamesQueryOptions);
  // const games = gamesQuery.data;

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
