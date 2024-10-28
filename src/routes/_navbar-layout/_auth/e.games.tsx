import * as React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { gamesQueryOptions } from '@/hooks/usegamequeries';
import Games from '@/components/editor/Games';
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { gameQuestionsQueryOptions } from '@/hooks/usegamequeries';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useRouterState } from '@tanstack/react-router';

export const Route = createFileRoute('/_navbar-layout/_auth/e/games')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(gamesQueryOptions),
  component: () => <EditorLayout />,
});
const EditorLayout = () => {
  const location = useRouterState({ select: (state) => state.location });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isGameRoute = location.pathname.includes('/games/');

  if (isMobile) {
    if (isGameRoute) {
      return <Outlet />;
    } else {
      return <Games />;
    }
  } else {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        autoSaveId="gamespanels"
        tagName="main"
      >
        <ResizablePanel defaultSize={25}>
          <Games />
        </ResizablePanel>
        <React.Fragment>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <Outlet />
          </ResizablePanel>
        </React.Fragment>
      </ResizablePanelGroup>
    );
  }
};
